
import { useState } from "react";
import { format, addDays, startOfWeek, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { EventDetails } from "./EventDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

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

  const nextWeek = () => {
    setCurrentWeek(current => addDays(current, 7));
  };

  const previousWeek = () => {
    setCurrentWeek(current => addDays(current, -7));
  };

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full" />;
  }

  return (
    <div className="space-y-6">
      {/* Navigation du calendrier */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {["Emma", "Lucas", "Sophie"].map((name) => (
              <div 
                key={name}
                className={`px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 ${
                  name === "Emma" ? "bg-[hsl(var(--emma-color))]" :
                  name === "Lucas" ? "bg-[hsl(var(--lucas-color))]" :
                  "bg-[hsl(var(--sophie-color))]"
                }`}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
                        <div
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`absolute inset-x-2 p-2 rounded-lg cursor-pointer transition-all ${event.participants[0]?.color || "bg-gray-100"}`}
                          style={{
                            top: "8px",
                            minHeight: "40px",
                          }}
                        >
                          <div className="flex flex-col h-full">
                            <div className="font-medium text-sm mb-1">
                              {event.title}
                            </div>
                            {event.platform && (
                              <div className="text-xs text-gray-600 mb-2">
                                {event.platform}
                              </div>
                            )}
                            <div className="flex -space-x-2 overflow-hidden mt-auto">
                              {event.participants.map((participant) => (
                                <Avatar
                                  key={participant.id}
                                  className="h-6 w-6 border-2 border-white"
                                >
                                  <AvatarImage src={participant.avatar} />
                                  <AvatarFallback>
                                    {participant.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </div>
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
              memberId: selectedEvent.participants[0].id, // À améliorer pour gérer plusieurs participants
              confirmed,
            });
          }
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};
