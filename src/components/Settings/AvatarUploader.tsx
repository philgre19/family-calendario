
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

      const fileExt = file.name.split('.').pop();
      const filePath = `${member.id}_${Date.now()}.${fileExt}`;

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onUploadSuccess(publicUrl);

      setTimeout(() => setUploadProgress(0), 1000);

      toast({
        title: "Succès !",
        description: "La photo a été téléchargée avec succès ✨",
      });
    } catch (error: any) {
      onUploadError(error);
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
