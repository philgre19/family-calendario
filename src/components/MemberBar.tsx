
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Member } from "@/types/database.types";
import { Progress } from "@/components/ui/progress";

export const MemberBar = () => {
  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase
        .from("members")
        .select("*, levels(*)");
      return data || [];
    },
  });

  return (
    <div className="flex items-center gap-3">
      {members.map((member: any) => (
        <div
          key={member.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src={member.avatar_url || ""} />
              <AvatarFallback
                style={{ backgroundColor: member.color }}
                className="text-white"
              >
                {member.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {member.levels && (
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {member.levels.current_level}
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-[100px]">
            <span className="text-sm font-medium">{member.name}</span>
            {member.levels && (
              <div className="flex items-center gap-2">
                <Progress
                  value={(member.levels.current_xp / 100) * 100}
                  className="h-1.5 w-20"
                />
                <span className="text-xs text-gray-400">
                  {member.levels.gold} 🪙
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
