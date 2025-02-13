
import { useState } from "react";
import { format, addDays, startOfWeek, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { EventDetails } from "./EventDetails";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarNavigation } from "./CalendarNavigation";
import { CalendarEventCard } from "./CalendarEventCard";

export const WeekCalendar = () => {
  const { events, isLoading, updateEventParticipant } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: fr }));

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h à 20h
  const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const getEventsForCell = (day: Date, hour: number) => {
    if (!events) return [];
    
    return events.filter((event) => {
      const eventDate = parseISO(event.start_date);
      const eventHour = eventDate.getHours();
      return (
        format(eventDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
        eventHour === hour
      );
    });
  };

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full" />;
  }

  return (
    <div className="space-y-6">
      <CalendarNavigation
        onPreviousWeek={() => setCurrentWeek(current => addDays(current, -7))}
        onNextWeek={() => setCurrentWeek(current => addDays(current, 7))}
      />

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* En-tête des jours */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="p-4"></div>
            {days.map((day) => (
              <div
                key={day.toString()}
                className="p-4 text-center font-medium bg-white rounded-lg shadow-sm"
              >
                <div className="text-sm text-gray-500">
                  {format(day, "EEEE", { locale: fr })}
                </div>
                <div className="text-lg">{format(day, "d")}</div>
              </div>
            ))}
          </div>

          {/* Grille des heures */}
          <div className="grid grid-cols-8 gap-2">
            {/* Colonne des heures */}
            <div className="space-y-2">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-24 p-2 text-right text-sm text-gray-500"
                >
                  {`${hour}:00`}
                </div>
              ))}
            </div>

            {/* Colonnes des jours */}
            {days.map((day) => (
              <div key={day.toString()} className="space-y-2">
                {hours.map((hour) => {
                  const cellEvents = getEventsForCell(day, hour);
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="h-24 p-2 bg-white rounded-lg shadow-sm relative group transition-all hover:shadow-md"
                    >
                      {cellEvents.map((event) => (
                        <CalendarEventCard
                          key={event.id}
                          event={event}
                          onClick={() => setSelectedEvent(event)}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <EventDetails
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onConfirm={(confirmed) => {
          if (selectedEvent) {
            updateEventParticipant.mutate({
              eventId: selectedEvent.id,
              memberId: selectedEvent.participants[0].id,
              confirmed,
            });
          }
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};
