
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Member } from "@/types/database.types";

export function useMembers() {
  return useQuery({
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
}
