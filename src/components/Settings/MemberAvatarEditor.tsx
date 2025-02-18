import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Save, Sparkles, Wand2, Camera, Palette } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { clsx } from "clsx";
import { AvatarDisplay } from "./AvatarDisplay";
import { AvatarUploader } from "./AvatarUploader";
import { PreferencesForm } from "./PreferencesForm";
import { IllustratedAvatarEditor } from "./IllustratedAvatarEditor";

interface MemberAvatarEditorProps {
  member: Member;
  onClose: () => void;
}

export function MemberAvatarEditor({ member, onClose }: MemberAvatarEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarType, setAvatarType] = useState<'illustrated' | 'photo'>(member.avatar_type || 'illustrated');
  const [avatarUrl, setAvatarUrl] = useState(member.avatar_url);
  const [customizationProgress, setCustomizationProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [participateInQuests, setParticipateInQuests] = useState(member.participate_in_quests);
  const [questStyle, setQuestStyle] = useState(member.quest_language_style);
  const [illustratedAvatarUpdates, setIllustratedAvatarUpdates] = useState<Partial<Member>>({
    current_hair: member.current_hair,
    current_clothes: member.current_clothes,
    current_accessory: member.current_accessory,
    current_hair_color: member.current_hair_color
  });

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
    
    const totalElements = 3;
    const selectedElements = Object.values({ ...illustratedAvatarUpdates, ...updates })
      .filter(Boolean)
      .length;
    setCustomizationProgress((selectedElements / totalElements) * 100);
  };

  const handlePhotoUploadSuccess = async (url: string) => {
    setAvatarUrl(url);
    setAvatarType('photo');
    setCustomizationProgress(100);
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const updateMemberAvatar = async (updates: Partial<Member>) => {
    const { error } = await supabase
      .from('members')
      .update(updates)
      .eq('id', member.id);

    if (error) throw error;

    await queryClient.invalidateQueries({ queryKey: ['members'] });
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

      await updateMemberAvatar(updates);

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      toast({
        title: "🌟 Super avatar !",
        description: "Tes changements sont enregistrés, tu es magnifique !",
        className: "bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white border-none"
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Oups !",
        description: error.message || "Un petit problème est survenu...",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 font-nunito relative">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-black/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-yellow-400 animate-bounce" />
          </div>
        </div>
      )}

      <div className="text-center mb-8 space-y-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Crée ton héros du quotidien !
        </h2>
        <p className="text-sm text-gray-600">
          Personnalise ton avatar et deviens un super aventurier !
        </p>
      </div>

      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-50 opacity-50" />
        <div className="relative p-8">
          <AvatarDisplay 
            member={member}
            avatarUrl={avatarUrl}
            avatarType={avatarType}
            selectedItems={illustratedAvatarUpdates}
            className="w-40 h-40 mx-auto transform hover:scale-105 transition-all duration-300"
          />
          
          {customizationProgress > 0 && (
            <div className="mt-6 max-w-md mx-auto">
              <p className="text-sm text-center mb-2 text-gray-600 font-medium">
                Personnalisation : {Math.round(customizationProgress)}%
              </p>
              <Progress 
                value={customizationProgress} 
                className="h-2 bg-purple-100"
              />
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="avatar" className="space-y-8">
        <TabsList className="grid grid-cols-2 w-full p-1 bg-purple-50 rounded-xl">
          <TabsTrigger 
            value="avatar" 
            className="data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-lg px-8 py-3 text-lg transition-all"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Avatar
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-lg px-8 py-3 text-lg transition-all"
          >
            Préférences
          </TabsTrigger>
        </TabsList>

        <TabsContent 
          value="avatar" 
          className="space-y-6 min-h-[400px] transition-all duration-300"
        >
          <div className="p-6 bg-white rounded-2xl shadow-soft space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Button
                variant={avatarType === "photo" ? "default" : "outline"}
                className={clsx(
                  "h-auto aspect-square p-6 rounded-2xl transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-lg",
                  "active:scale-[0.98]",
                  avatarType === "photo" && "bg-gradient-to-br from-blue-500 to-purple-500"
                )}
                onClick={() => handleAvatarTypeChange("photo")}
              >
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center mx-auto">
                    <Camera className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Photo de moi</p>
                    <p className="text-sm opacity-90">Utilise ta propre photo</p>
                  </div>
                </div>
              </Button>

              <Button
                variant={avatarType === "illustrated" ? "default" : "outline"}
                className={clsx(
                  "h-auto aspect-square p-6 rounded-2xl transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-lg",
                  "active:scale-[0.98]",
                  avatarType === "illustrated" && "bg-gradient-to-br from-blue-500 to-purple-500"
                )}
                onClick={() => handleAvatarTypeChange("illustrated")}
              >
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center mx-auto">
                    <Palette className="w-10 h-10 text-purple-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Avatar créatif</p>
                    <p className="text-sm opacity-90">Crée ton personnage</p>
                  </div>
                </div>
              </Button>
            </div>

            <div className="pt-4 border-t">
              {avatarType === "photo" ? (
                <AvatarUploader
                  member={member}
                  isLoading={isLoading}
                  onUploadSuccess={handlePhotoUploadSuccess}
                  onUploadError={(error) => {
                    toast({
                      title: "Oups !",
                      description: error.message,
                      variant: "destructive"
                    });
                  }}
                />
              ) : (
                <IllustratedAvatarEditor 
                  member={member}
                  onUpdate={handleIllustratedAvatarUpdate}
                  currentItems={illustratedAvatarUpdates}
                />
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent 
          value="preferences" 
          className="space-y-6 min-h-[400px] transition-all duration-300"
        >
          <div className="p-6 bg-white rounded-2xl shadow-soft">
            <PreferencesForm
              participateInQuests={participateInQuests}
              questStyle={questStyle}
              onParticipateChange={setParticipateInQuests}
              onStyleChange={setQuestStyle}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 bg-gradient-to-t from-white to-transparent pt-8 pb-6 mt-8">
        <Button 
          className={clsx(
            "w-full text-lg py-6 transition-all duration-300",
            "bg-gradient-to-r from-blue-500 to-purple-500",
            "hover:from-blue-600 hover:to-purple-600",
            "hover:scale-[1.02] hover:shadow-lg",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          onClick={handleSave}
          disabled={isLoading}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {isLoading ? "Enregistrement..." : "Valider mon avatar magique !"}
        </Button>
      </div>
    </div>
  );
}
