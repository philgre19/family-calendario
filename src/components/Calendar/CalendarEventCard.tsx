
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EventParticipant {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface Event {
  id: string;
  title: string;
  platform: string | null;
  participants: EventParticipant[];
}

interface CalendarEventCardProps {
  event: Event;
  onClick: () => void;
}

export const CalendarEventCard = ({ event, onClick }: CalendarEventCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`absolute inset-x-2 p-2 rounded-lg cursor-pointer transition-all ${event.participants[0]?.color || "bg-gray-100"}`}
      style={{
        top: "8px",
        minHeight: "40px",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="font-medium text-sm mb-1">{event.title}</div>
        {event.platform && (
          <div className="text-xs text-gray-600 mb-2">{event.platform}</div>
        )}
        <div className="flex -space-x-2 overflow-hidden mt-auto">
          {event.participants.map((participant) => (
            <Avatar
              key={participant.id}
              className="h-6 w-6 border-2 border-white"
            >
              <AvatarImage src={participant.avatar} />
              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};
