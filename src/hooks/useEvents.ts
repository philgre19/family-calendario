
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Event, EventParticipant, Member } from "@/types/database.types";

interface EventWithParticipants extends Event {
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    confirmed: boolean | null;
  }>;
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
        .order("start_date");

      // Récupérer tous les membres
      const { data: members } = await supabase
        .from("members")
        .select("*");

      // Récupérer tous les participants
      const { data: participants } = await supabase
        .from("event_participants")
        .select("*");

      // Mapper les événements avec leurs participants
      return events?.map((event): EventWithParticipants => {
        const eventParticipants = participants?.filter(
          (p) => p.event_id === event.id
        );
        return {
          ...event,
          participants: eventParticipants?.map((ep) => {
            const member = members?.find((m) => m.id === ep.member_id);
            return {
              id: member?.id || "",
              name: member?.name || "",
              avatar: member?.avatar_url || "",
              confirmed: ep.confirmed,
            };
          }) || [],
        };
      }) || [];
    },
  });

  const addEvent = useMutation({
    mutationFn: async (event: Omit<Event, "id"> & { participant_ids: string[] }) => {
      const { data: newEvent } = await supabase
        .from("events")
        .insert({
          title: event.title,
          description: event.description,
          start_date: event.start_date,
          end_date: event.end_date,
          platform: event.platform,
        })
        .select()
        .single();

      if (!newEvent) throw new Error("Failed to create event");

      // Ajouter les participants
      await supabase
        .from("event_participants")
        .insert(
          event.participant_ids.map((memberId) => ({
            event_id: newEvent.id,
            member_id: memberId,
          }))
        );

      return newEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
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
      const { data } = await supabase
        .from("event_participants")
        .update({ confirmed })
        .eq("event_id", eventId)
        .eq("member_id", memberId)
        .select()
        .single();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (eventId: string) => {
      await supabase.from("events").delete().eq("id", eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return {
    events,
    isLoading,
    addEvent,
    updateEventParticipant,
    deleteEvent,
  };
};
