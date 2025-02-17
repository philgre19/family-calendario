
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Save, Loader } from "lucide-react";
import { AvatarDisplay } from "./AvatarDisplay";
import { AvatarTypeSelector } from "./AvatarTypeSelector";
import { AvatarUploader } from "./AvatarUploader";
import { PreferencesForm } from "./PreferencesForm";
import { IllustratedAvatarEditor } from "./IllustratedAvatarEditor";

interface MemberAvatarEditorProps {
  member: Member;
  onClose: () => void;
}

type QuestStyle = 'rpg' | 'neutral';

export function MemberAvatarEditor({ member, onClose }: MemberAvatarEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarType, setAvatarType] = useState<'illustrated' | 'photo'>(member.avatar_type || 'photo');
  const [participateInQuests, setParticipateInQuests] = useState(member.participate_in_quests);
  const [questStyle, setQuestStyle] = useState<QuestStyle>(member.quest_language_style as QuestStyle);
  const [avatarUrl, setAvatarUrl] = useState(member.avatar_url);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [illustratedAvatarUpdates, setIllustratedAvatarUpdates] = useState<Partial<Member>>({});

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleAvatarTypeChange = async (type: 'illustrated' | 'photo') => {
    setAvatarType(type);
    if (type === 'illustrated') {
      setAvatarUrl(null);
    }
  };

  const handleUploadSuccess = async (url: string) => {
    setAvatarUrl(url);
    try {
      const { error: updateError } = await supabase
        .from('members')
        .update({ 
          avatar_url: url,
          avatar_type: 'photo',
          current_hair: null,
          current_clothes: null,
          current_accessory: null,
          current_hair_color: null
        })
        .eq('id', member.id);

      if (updateError) throw updateError;
      
      await queryClient.invalidateQueries({ queryKey: ['members'] });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour l'avatar",
        variant: "destructive",
      });
    }
  };

  const handleUploadError = (error: Error) => {
    toast({
      title: "Erreur",
      description: error.message || "Impossible de télécharger l'image",
      variant: "destructive",
    });
  };

  const handleIllustratedAvatarUpdate = (updates: Partial<Member>) => {
    setIllustratedAvatarUpdates(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const updates = {
        avatar_type: avatarType,
        avatar_url: avatarType === 'photo' ? avatarUrl : null,
        participate_in_quests: participateInQuests,
        quest_language_style: questStyle,
        ...(avatarType === 'illustrated' ? illustratedAvatarUpdates : {
          current_hair: null,
          current_clothes: null,
          current_accessory: null,
          current_hair_color: null
        })
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
      <AvatarDisplay 
        avatarUrl={avatarUrl}
        avatarType={avatarType}
        memberName={member.name}
        uploadProgress={uploadProgress}
      />

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
          <AvatarTypeSelector 
            avatarType={avatarType}
            onTypeChange={handleAvatarTypeChange}
          />

          {avatarType === "photo" ? (
            <AvatarUploader
              member={member}
              isLoading={isLoading}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          ) : (
            <IllustratedAvatarEditor 
              member={member}
              onUpdate={handleIllustratedAvatarUpdate}
            />
          )}
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <PreferencesForm
            participateInQuests={participateInQuests}
            questStyle={questStyle}
            onParticipateChange={setParticipateInQuests}
            onStyleChange={setQuestStyle}
          />
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
