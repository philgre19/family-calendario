
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { parseISO } from "date-fns";

interface CalendarItem {
  id: string;
  title: string;
  start_date: string;
  end_date?: string;
  type: "event" | "task";
  description?: string | null;
  platform?: string | null;
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    color: string;
    confirmed?: boolean | null;
  }>;
}

export const useCalendarItems = () => {
  return useQuery({
    queryKey: ["calendar-items"],
    queryFn: async () => {
      // Récupérer les membres pour enrichir les données
      const { data: members } = await supabase.from("members").select("*");
      const membersMap = new Map(members?.map(m => [m.id, m]));

      // Récupérer les événements
      const { data: events } = await supabase
        .from("events")
        .select("*, event_participants(member_id, confirmed)")
        .order("start_date", { ascending: true });

      // Récupérer les tâches avec date
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .not("date", "is", null)
        .order("date", { ascending: true });

      const calendarItems: CalendarItem[] = [];

      // Transformer les événements
      events?.forEach(event => {
        const participants = (event.participants || [])
          .map(participantId => {
            const member = membersMap.get(participantId);
            if (!member) return null;
            const participant = event.event_participants?.find(
              p => p.member_id === participantId
            );
            return {
              id: member.id,
              name: member.name,
              avatar: member.avatar_url || "",
              color: member.color,
              confirmed: participant?.confirmed
            };
          })
          .filter(Boolean);

        calendarItems.push({
          id: event.id,
          title: event.title,
          start_date: event.start_date,
          end_date: event.end_date,
          type: "event",
          description: event.description,
          platform: event.platform,
          participants: participants as CalendarItem["participants"]
        });
      });

      // Transformer les tâches
      tasks?.forEach(task => {
        if (!task.date) return;

        const participants = (task.members_ids || [])
          .map(memberId => {
            const member = membersMap.get(memberId);
            if (!member) return null;
            return {
              id: member.id,
              name: member.name,
              avatar: member.avatar_url || "",
              color: member.color
            };
          })
          .filter(Boolean);

        if (task.assigned_to) {
          const assignee = membersMap.get(task.assigned_to);
          if (assignee && !participants.find(p => p.id === assignee.id)) {
            participants.push({
              id: assignee.id,
              name: assignee.name,
              avatar: assignee.avatar_url || "",
              color: assignee.color
            });
          }
        }

        calendarItems.push({
          id: task.id,
          title: task.description,
          start_date: task.date,
          type: "task",
          participants: participants as CalendarItem["participants"]
        });
      });

      // Trier par date
      return calendarItems.sort((a, b) => 
        parseISO(a.start_date).getTime() - parseISO(b.start_date).getTime()
      );
    }
  });
};
