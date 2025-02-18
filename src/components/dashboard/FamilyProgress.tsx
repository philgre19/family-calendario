
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star } from "lucide-react";
import { Member } from "@/types/database.types";
import { clsx } from "clsx";

export function FamilyProgress() {
  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase
        .from("members")
        .select("*, levels(*)");
      return data || [];
    },
  });

  const sortedMembers = [...members].sort((a, b) => 
    ((b.levels?.current_xp || 0) + (b.levels?.gold || 0)) - 
    ((a.levels?.current_xp || 0) + (a.levels?.gold || 0))
  );

  const topMember = sortedMembers[0];

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">
            Classement famille
          </h3>
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>

        <div className="grid gap-4">
          {sortedMembers.map((member: any, index) => (
            <div 
              key={member.id}
              className={clsx(
                "flex items-center gap-4 p-4 rounded-xl transition-all",
                "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50/50",
                index === 0 && "bg-gradient-to-r from-yellow-50 to-transparent"
              )}
            >
              <div className="relative">
                <div className={clsx(
                  "w-12 h-12 rounded-full ring-2 overflow-hidden",
                  "transition-transform hover:scale-105 duration-200",
                  index === 0 ? "ring-yellow-400" : "ring-gray-200"
                )}>
                  {member.avatar_url ? (
                    <img 
                      src={member.avatar_url} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-white text-lg font-bold"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                {index === 0 && (
                  <Star className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800">
                    {member.name}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Niveau {member.levels?.current_level || 1}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Progress
                    value={(member.levels?.current_xp || 0)}
                    max={100}
                    className="h-2"
                  />
                  <span className="text-sm text-yellow-600 font-medium whitespace-nowrap">
                    {member.levels?.gold || 0} 🪙
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
