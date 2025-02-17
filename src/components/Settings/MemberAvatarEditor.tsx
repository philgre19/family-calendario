
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Member } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Upload, Save, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemberAvatarEditorProps {
  member: Member;
  onClose: () => void;
}

const hairColors = [
  { name: "Noir", value: "#000000" },
  { name: "Brun", value: "#4A2F1C" },
  { name: "Blond", value: "#FFD700" },
  { name: "Roux", value: "#D35400" },
];

type QuestStyle = 'rpg' | 'neutral';

export function MemberAvatarEditor({ member, onClose }: MemberAvatarEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarType, setAvatarType] = useState<'illustrated' | 'photo'>(member.avatar_type || 'photo');
  const [participateInQuests, setParticipateInQuests] = useState(member.participate_in_quests);
  const [questStyle, setQuestStyle] = useState<QuestStyle>(member.quest_language_style as QuestStyle);
  const [avatarUrl, setAvatarUrl] = useState(member.avatar_url);
  const [uploadProgress, setUploadProgress] = useState(0);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
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

      setAvatarUrl(publicUrl);

      // Mettre à jour immédiatement l'URL de l'avatar dans la base de données
      const { error: updateError } = await supabase
        .from('members')
        .update({ avatar_url: publicUrl })
        .eq('id', member.id);

      if (updateError) throw updateError;

      setTimeout(() => setUploadProgress(0), 1000);

      toast({
        title: "Succès !",
        description: "La photo a été téléchargée avec succès ✨",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de télécharger l'image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarTypeChange = async (type: 'illustrated' | 'photo') => {
    setAvatarType(type);
    if (type === 'illustrated') {
      setAvatarUrl(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const updates = {
        avatar_type: avatarType,
        avatar_url: avatarUrl,
        participate_in_quests: participateInQuests,
        quest_language_style: questStyle,
      };

      const { error } = await supabase
        .from('members')
        .update(updates)
        .eq('id', member.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: "Succès !",
        description: "Les modifications ont été enregistrées ✨"
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'enregistrer les modifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <Avatar className="w-32 h-32 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
            {avatarUrl ? (
              <AvatarImage 
                src={avatarUrl} 
                alt={member.name} 
                className={cn(
                  "object-cover transition-all duration-200",
                  avatarType === "photo" && "rounded-full"
                )}
              />
            ) : (
              <AvatarFallback>
                <Camera className="w-12 h-12 text-primary/40" />
              </AvatarFallback>
            )}
          </Avatar>
          {uploadProgress > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <div className="text-white text-sm font-medium">
                {uploadProgress}%
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="avatar" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="avatar">
            Avatar
          </TabsTrigger>
          <TabsTrigger value="preferences">
            Préférences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="avatar" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={avatarType === "illustrated" ? "default" : "outline"}
              className={cn(
                "h-auto p-4 space-y-2 transition-all",
                avatarType === "illustrated" ? "bg-primary text-primary-foreground" : "hover:bg-primary/5"
              )}
              onClick={() => handleAvatarTypeChange("illustrated")}
            >
              <div className="w-full aspect-square rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p>Avatar illustré</p>
            </Button>

            <Button
              variant={avatarType === "photo" ? "default" : "outline"}
              className={cn(
                "h-auto p-4 space-y-2 transition-all",
                avatarType === "photo" ? "bg-primary text-primary-foreground" : "hover:bg-primary/5"
              )}
              onClick={() => handleAvatarTypeChange("photo")}
            >
              <div className="w-full aspect-square rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p>Photo personnelle</p>
            </Button>
          </div>

          {avatarType === "photo" && (
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
          )}
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="quests-participation">Participer aux quêtes</Label>
                <Switch
                  id="quests-participation"
                  checked={participateInQuests}
                  onCheckedChange={setParticipateInQuests}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quest-style">Style de langage</Label>
                <Select value={questStyle} onValueChange={(value) => setQuestStyle(value as QuestStyle)}>
                  <SelectTrigger id="quest-style">
                    <SelectValue placeholder="Choisir un style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rpg">Style RPG (Quêtes, Missions, Défis)</SelectItem>
                    <SelectItem value="neutral">Style neutre (Tâches, Routines, Objectifs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 bg-background pt-4 pb-6">
        <Button 
          className="w-full" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
