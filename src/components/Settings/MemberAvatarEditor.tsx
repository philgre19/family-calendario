
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Member, AvatarItem } from "@/types/database.types";
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
import { Progress } from "@/components/ui/progress";

interface MemberAvatarEditorProps {
  member: Member;
  onClose: () => void;
}

const hairColors = [
  { name: "Noir", value: "#000000" },
  { name: "Brun", value: "#4A2F1C" },
  { name: "Châtain", value: "#8B4513" },
  { name: "Blond", value: "#FFD700" },
  { name: "Roux", value: "#D35400" },
];

type QuestStyle = 'rpg' | 'neutral';

export function MemberAvatarEditor({ member, onClose }: MemberAvatarEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarType, setAvatarType] = useState<'illustrated' | 'photo'>(member.avatar_type);
  const [participateInQuests, setParticipateInQuests] = useState(member.participate_in_quests);
  const [questStyle, setQuestStyle] = useState<QuestStyle>(member.quest_language_style as QuestStyle);
  const [avatarUrl, setAvatarUrl] = useState(member.avatar_url);
  const [age, setAge] = useState(member.age?.toString() || '');
  const [currentHair, setCurrentHair] = useState(member.current_hair);
  const [currentHairColor, setCurrentHairColor] = useState(member.current_hair_color || '#000000');
  const [currentClothes, setCurrentClothes] = useState(member.current_clothes);
  const [currentAccessory, setCurrentAccessory] = useState(member.current_accessory);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const { data: avatarItems = [] } = useQuery({
    queryKey: ['avatar_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('avatar_items')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as AvatarItem[];
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      setUploadProgress(0);
      const file = event.target.files?.[0];
      if (!file) return;

      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Le fichier est trop volumineux (max 5MB)");
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${member.id}_${Date.now()}.${fileExt}`;

      // Simuler la progression de l'upload
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const { error: uploadError } = await supabase.storage
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

      // Reset progress after a short delay
      setTimeout(() => setUploadProgress(0), 1000);
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

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const updates = {
        avatar_type: avatarType,
        avatar_url: avatarUrl,
        participate_in_quests: participateInQuests,
        quest_language_style: questStyle,
        age: age ? parseInt(age) : null,
        current_hair: currentHair,
        current_clothes: currentClothes,
        current_accessory: currentAccessory,
        current_hair_color: currentHairColor,
      };

      const { error } = await supabase
        .from('members')
        .update(updates)
        .eq('id', member.id);

      if (error) throw error;

      // Mettre à jour les éléments d'avatar du membre
      if (avatarType === 'illustrated' && (currentHair || currentClothes || currentAccessory)) {
        const { error: itemsError } = await supabase
          .from('member_avatar_items')
          .upsert([
            { member_id: member.id, item_id: currentHair, color: currentHairColor },
            { member_id: member.id, item_id: currentClothes },
            { member_id: member.id, item_id: currentAccessory },
          ].filter(item => item.item_id));

        if (itemsError) throw itemsError;
      }

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

  const filterItems = (type: AvatarItem['type']) => {
    return avatarItems.filter(item => item.type === type);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center mb-8">
        <div className="relative">
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
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="avatar">Avatar</TabsTrigger>
          <TabsTrigger value="customization" disabled={avatarType !== 'illustrated'}>
            Personnalisation
          </TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
        </TabsList>

        <TabsContent value="avatar" className="space-y-6">
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
                <Button variant="outline" className="cursor-pointer" asChild disabled={isLoading}>
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

        <TabsContent value="customization" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Coiffure</Label>
              <Select value={currentHair || ''} onValueChange={setCurrentHair}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une coiffure" />
                </SelectTrigger>
                <SelectContent>
                  {filterItems('hair').map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentHair && (
              <div className="space-y-2">
                <Label>Couleur des cheveux</Label>
                <div className="grid grid-cols-5 gap-2">
                  {hairColors.map((color) => (
                    <Button
                      key={color.value}
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full h-8 rounded-full p-0",
                        currentHairColor === color.value && "ring-2 ring-primary"
                      )}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setCurrentHairColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Vêtements</Label>
              <Select value={currentClothes || ''} onValueChange={setCurrentClothes}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir des vêtements" />
                </SelectTrigger>
                <SelectContent>
                  {filterItems('clothes').map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Accessoires</Label>
              <Select value={currentAccessory || ''} onValueChange={setCurrentAccessory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un accessoire" />
                </SelectTrigger>
                <SelectContent>
                  {filterItems('accessory').map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                max="99"
              />
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

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Niveau {member.level || 1}</span>
                  <span>{member.gold || 0} 🪙</span>
                </div>
                <Progress value={((member.xp || 0) / 100) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {member.xp || 0} / 100 XP
                </p>
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
