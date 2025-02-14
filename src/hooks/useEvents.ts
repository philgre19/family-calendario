
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface EventParticipant {
  id: string;
  name: string;
  avatar: string;
  confirmed: boolean | null;
  color: string;
}

interface Event {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string | null;
  platform: string | null;
  participants: EventParticipant[];
}

export const useEvents = () => {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      // Récupérer les événements
      const { data: events } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true });

      if (!events) return [];

      // Récupérer tous les membres
      const { data: members } = await supabase.from("members").select("*");
      const membersMap = new Map(members?.map(m => [m.id, m]));

      // Pour chaque événement, enrichir les informations des participants
      return events.map(event => ({
        ...event,
        participants: (event.participants || [])
          .map(participantId => {
            const member = membersMap.get(participantId);
            if (!member) return null;
            return {
              id: member.id,
              name: member.name,
              avatar: member.avatar_url || "",
              color: member.color,
              confirmed: null // À implémenter plus tard avec la table event_participants
            };
          })
          .filter(Boolean) as EventParticipant[]
      }));
    }
  });

  const updateEventParticipant = useMutation({
    mutationFn: async ({
      eventId,
      memberId,
      confirmed,
    }: {
      eventId: string;
      memberId: string;
      confirmed: boolean;
    }) => {
      const { error } = await supabase
        .from("event_participants")
        .upsert({
          event_id: eventId,
          member_id: memberId,
          confirmed,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return {
    events,
    isLoading,
    updateEventParticipant,
  };
};
