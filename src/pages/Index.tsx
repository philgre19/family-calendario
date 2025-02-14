
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { WeekCalendar } from "@/components/Calendar/WeekCalendar";
import { Button } from "@/components/ui/button";
import { MemberProgressCard } from "@/components/MemberProgressCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase.from("members").select("*");
      return data || [];
    },
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await supabase.from("tasks").select("*");
      return data || [];
    },
  });

  const getMemberStats = (memberId: string) => {
    const memberTasks = tasks.filter(task => 
      task.members_ids?.includes(memberId) || task.assigned_to === memberId
    );
    const completedTasks = memberTasks.filter(task => task.completed).length;
    const points = memberTasks
      .filter(task => task.completed)
      .reduce((sum, task) => sum + (task.points || 0), 0);

    return {
      completedTasks,
      totalTasks: memberTasks.length,
      points,
    };
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Tableau de bord familial</h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/ajouter-tache")}
              className="bg-[#4285F4] hover:bg-[#3367D6]"
            >
              Ajouter une tâche
            </Button>
            <Button
              onClick={() => navigate("/ajouter-evenement")}
              className="bg-[#34A853] hover:bg-[#2E7D49]"
            >
              Ajouter un événement
            </Button>
          </div>
        </div>

        {/* Cartes de progression */}
        <div className="grid grid-cols-3 gap-6">
          {members.map((member) => {
            const stats = getMemberStats(member.id);
            return (
              <MemberProgressCard
                key={member.id}
                member={member}
                {...stats}
              />
            );
          })}
        </div>

        {/* Calendrier */}
        <div className="bg-gray-50 rounded-xl p-6">
          <WeekCalendar />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
