
import { useState } from "react";
import { Member } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarUploaderProps {
  member: Member;
  isLoading: boolean;
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: Error) => void;
}

export function AvatarUploader({ member, isLoading, onUploadSuccess, onUploadError }: AvatarUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadProgress(0);
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Le fichier est trop volumineux (max 5MB)");
      }

      // Construire le nom de fichier avec l'ID du membre
      const fileExt = file.name.split('.').pop();
      const filePath = `avatar_${member.id}.${fileExt}`;

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      // Supprimer l'ancien fichier s'il existe
      await supabase.storage
        .from('avatars')
        .remove([`avatar_${member.id}.*`]);

      // Upload du nouveau fichier
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '0',
          upsert: true,
        });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Mettre à jour l'URL de l'avatar dans la table members
      const { error: updateError } = await supabase
        .from('members')
        .update({ 
          avatar_url: publicUrl,
          avatar_type: 'photo',
          current_hair: null,
          current_clothes: null,
          current_accessory: null,
          current_hair_color: null
        })
        .eq('id', member.id);

      if (updateError) throw updateError;

      onUploadSuccess(publicUrl);

      setTimeout(() => setUploadProgress(0), 1000);

      toast({
        title: "Avatar mis à jour !",
        description: "Votre photo de profil a été mise à jour avec succès.",
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      onUploadError(error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'upload",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="avatar-upload"
        onChange={handleFileUpload}
        disabled={isLoading}
      />
      <label htmlFor="avatar-upload">
        <Button 
          variant="outline" 
          className={cn(
            "cursor-pointer transition-all",
            "hover:bg-primary/5 hover:border-primary/30",
            "focus:ring-2 focus:ring-primary/20"
          )} 
          asChild 
          disabled={isLoading}
        >
          <span>
            {isLoading ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Choisir une photo
          </span>
        </Button>
      </label>
    </div>
  );
}
