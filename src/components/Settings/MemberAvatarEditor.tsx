
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Save, Loader, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
  const [customizationProgress, setCustomizationProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [illustratedAvatarUpdates, setIllustratedAvatarUpdates] = useState<Partial<Member>>({});

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleAvatarTypeChange = (type: 'illustrated' | 'photo') => {
    setAvatarType(type);
    if (type === 'illustrated') {
      setAvatarUrl(null);
    }
  };

  const handleIllustratedAvatarUpdate = (updates: Partial<Member>) => {
    setIllustratedAvatarUpdates(prev => ({ ...prev, ...updates }));
    
    // Calculer la progression
    const totalElements = 3; // cheveux, vêtements, accessoires
    const selectedElements = Object.values(updates).filter(Boolean).length;
    setCustomizationProgress((selectedElements / totalElements) * 100);
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
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      toast({
        title: "Hourra ! 🎉",
        description: "Ton avatar est magnifique ! Les modifications ont été enregistrées.",
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Oups !",
        description: error.message || "Impossible d'enregistrer les modifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 font-nunito">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-yellow-400 animate-bounce" />
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-pink-50 opacity-50" />
        <div className="relative">
          <AvatarDisplay 
            avatarUrl={avatarUrl}
            avatarType={avatarType}
            memberName={member.name}
            uploadProgress={uploadProgress}
            memberId={member.id}
          />
        </div>
      </div>

      {customizationProgress > 0 && (
        <div className="mt-4 mb-6">
          <p className="text-sm text-center mb-2 text-muted-foreground">
            Personnalisation complétée : {Math.round(customizationProgress)}%
          </p>
          <Progress value={customizationProgress} className="h-2" />
        </div>
      )}

      <Tabs defaultValue="avatar" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="avatar" className="text-lg">
            Avatar
          </TabsTrigger>
          <TabsTrigger value="preferences" className="text-lg">
            Préférences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="avatar" className="space-y-6">
          <div className="p-6 bg-white rounded-xl shadow-soft space-y-6">
            <AvatarTypeSelector 
              avatarType={avatarType}
              onTypeChange={handleAvatarTypeChange}
            />

            {avatarType === "photo" ? (
              <AvatarUploader
                member={member}
                isLoading={isLoading}
                onUploadSuccess={(url) => {
                  setAvatarUrl(url);
                  setCustomizationProgress(100);
                }}
                onUploadError={(error) => {
                  toast({
                    title: "Oups !",
                    description: error.message,
                    variant: "destructive",
                  });
                }}
              />
            ) : (
              <IllustratedAvatarEditor 
                member={member}
                onUpdate={handleIllustratedAvatarUpdate}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="p-6 bg-white rounded-xl shadow-soft">
            <PreferencesForm
              participateInQuests={participateInQuests}
              questStyle={questStyle}
              onParticipateChange={setParticipateInQuests}
              onStyleChange={setQuestStyle}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 bg-background pt-4 pb-6">
        <Button 
          className="w-full text-lg py-6 bg-gradient-to-r from-primary/90 to-primary transition-all hover:from-primary hover:to-primary/90" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 mr-2" />
          )}
          Enregistrer mon super avatar !
        </Button>
      </div>
    </div>
  );
}
