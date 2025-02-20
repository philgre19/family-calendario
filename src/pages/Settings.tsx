
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "@/components/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Users, Camera, Pencil } from "lucide-react";
import { Member } from "@/types/database.types";
import { MemberAvatarEditor } from "@/components/Settings/MemberAvatarEditor";

export default function Settings() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { data: members, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("name");
      
      if (error) throw error;
      
      const membersWithHairColor = data.map(member => {
        const memberData: Member = {
          id: member.id,
          name: member.name,
          created_at: member.created_at,
          avatar_url: member.avatar_url,
          color: member.color,
          avatar_type: member.avatar_type as 'illustrated' | 'photo',
          participate_in_quests: member.participate_in_quests,
          quest_language_style: member.quest_language_style as 'rpg' | 'neutral' | null,
          current_hair: member.current_hair,
          current_clothes: member.current_clothes,
          current_accessory: member.current_accessory,
          current_background: member.current_background,
          current_hair_color: null,
          level: member.level,
          xp: member.xp
        };
        return memberData;
      });
      
      return membersWithHairColor;
    },
  });

  const onClose = useCallback(() => {
    setSelectedMember(null);
  }, []);

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-muted-foreground" />
          <h1 className="text-3xl font-semibold">Paramètres</h1>
        </div>

        <div className="grid gap-8">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-muted-foreground" />
              <h2 className="text-2xl font-medium">Membres de la famille</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <p>Chargement des membres...</p>
              ) : (
                members?.map((member) => (
                  <Sheet key={member.id}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full p-4 h-auto"
                        onClick={() => setSelectedMember(member)}
                      >
                        <div className="flex items-center gap-4 w-full">
                          <Avatar className="w-16 h-16">
                            {member.avatar_url ? (
                              <AvatarImage src={member.avatar_url} alt={member.name} />
                            ) : (
                              <AvatarFallback>
                                {member.avatar_type === "illustrated" ? (
                                  <Camera className="w-8 h-8 text-muted-foreground" />
                                ) : (
                                  member.name.charAt(0)
                                )}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1 text-left">
                            <p className="text-lg font-medium">{member.name}</p>
                          </div>
                          <Pencil className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-2xl">
                      <SheetHeader>
                        <SheetTitle>Personnalisation de {member.name}</SheetTitle>
                      </SheetHeader>
                      <MemberAvatarEditor member={member} onClose={onClose} />
                    </SheetContent>
                  </Sheet>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
