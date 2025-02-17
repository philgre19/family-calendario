
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Level } from "@/types/database.types";
import { toast } from "sonner";

const XP_PER_LEVEL = 100; // Base XP needed per level

export const useMemberProgress = (memberId: string) => {
  const queryClient = useQueryClient();

  const { data: progress, isLoading } = useQuery<Level>({
    queryKey: ["member-progress", memberId],
    queryFn: async () => {
      const { data: level } = await supabase
        .from("levels")
        .select("*")
        .eq("member_id", memberId)
        .single();

      if (!level) {
        // Create initial level if it doesn't exist
        const { data: newLevel } = await supabase
          .from("levels")
          .insert({
            member_id: memberId,
            current_level: 1,
            current_xp: 0,
            gold: 0,
          })
          .select()
          .single();

        return newLevel;
      }

      return level;
    },
  });

  const addXP = useMutation({
    mutationFn: async ({ xp, gold }: { xp: number; gold: number }) => {
      const currentProgress = progress;
      if (!currentProgress) return;

      let newXP = currentProgress.current_xp + xp;
      let newLevel = currentProgress.current_level;
      const xpNeeded = XP_PER_LEVEL * currentProgress.current_level;

      // Level up if enough XP
      while (newXP >= xpNeeded) {
        newXP -= xpNeeded;
        newLevel++;
        // Level up animation and sound would go here
        toast.success(`Niveau ${newLevel} atteint ! 🎉`, {
          duration: 3000,
        });
      }

      const { data, error } = await supabase
        .from("levels")
        .update({
          current_xp: newXP,
          current_level: newLevel,
          gold: currentProgress.gold + gold,
        })
        .eq("member_id", memberId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-progress"] });
    },
  });

  return {
    progress,
    isLoading,
    addXP,
  };
};
