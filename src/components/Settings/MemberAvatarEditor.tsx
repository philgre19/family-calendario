
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Upload, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemberAvatarEditorProps {
  member: Member;
  onClose: () => void;
}

type QuestStyle = 'rpg' | 'neutral';

export function MemberAvatarEditor({ member, onClose }: MemberAvatarEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarType, setAvatarType] = useState<'illustrated' | 'photo'>(member.avatar_type);
  const [participateInQuests, setParticipateInQuests] = useState(member.participate_in_quests);
  const [questStyle, setQuestStyle] = useState<QuestStyle>(member.quest_language_style as QuestStyle);
  const [avatarUrl, setAvatarUrl] = useState(member.avatar_url);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${member.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger l'image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('members')
        .update({
          avatar_type: avatarType,
          avatar_url: avatarUrl,
          participate_in_quests: participateInQuests,
          quest_language_style: questStyle,
        })
        .eq('id', member.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: "Succès !",
        description: "Les modifications ont été enregistrées",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les modifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestStyleChange = (value: string) => {
    setQuestStyle(value as QuestStyle);
  };

  return (
    <div className="mt-6 space-y-8">
      <div className="space-y-4">
        <Label>Type d'avatar</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={avatarType === "illustrated" ? "default" : "outline"}
            className="h-auto p-4 space-y-2"
            onClick={() => setAvatarType("illustrated")}
          >
            <div className="w-full aspect-square rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <p>Avatar illustré</p>
          </Button>

          <Button
            variant={avatarType === "photo" ? "default" : "outline"}
            className="h-auto p-4 space-y-2"
            onClick={() => setAvatarType("photo")}
          >
            <div className="w-full aspect-square rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p>Photo personnelle</p>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Aperçu</Label>
        <div className="flex justify-center">
          <Avatar className="w-32 h-32">
            {avatarUrl ? (
              <AvatarImage 
                src={avatarUrl} 
                alt={member.name} 
                className={cn(
                  "object-cover",
                  avatarType === "photo" && "rounded-full"
                )}
              />
            ) : (
              <AvatarFallback>
                <Camera className="w-12 h-12 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        
        {avatarType === "photo" && (
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="avatar-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Choisir une photo
                </span>
              </Button>
            </label>
          </div>
        )}
      </div>

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
          <Select value={questStyle} onValueChange={handleQuestStyleChange}>
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

      <div className="pt-4">
        <Button 
          className="w-full" 
          onClick={handleSave}
          disabled={isLoading}
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
