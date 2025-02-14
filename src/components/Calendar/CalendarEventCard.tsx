
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Circle, Calendar, CheckSquare } from "lucide-react";

interface EventParticipant {
  id: string;
  name: string;
  avatar: string;
  color: string;
  confirmed?: boolean | null;
}

interface CalendarItem {
  id: string;
  title: string;
  type: "event" | "task";
  platform?: string | null;
  participants: EventParticipant[];
}

interface CalendarEventCardProps {
  event: CalendarItem;
  onClick: () => void;
}

export const CalendarEventCard = ({ event, onClick }: CalendarEventCardProps) => {
  const mainParticipant = event.participants[0];
  const Icon = event.type === "event" ? Calendar : CheckSquare;

  if (!mainParticipant) return null;

  return (
    <div
      onClick={onClick}
      className="absolute inset-x-2 p-2 rounded-lg cursor-pointer transition-all"
      style={{
        backgroundColor: `${mainParticipant.color}20`,
        top: "8px",
        minHeight: "40px",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color: mainParticipant.color }} />
          <div className="font-medium text-sm">{event.title}</div>
        </div>
        
        {event.platform && (
          <div className="text-xs text-gray-600 mt-1">{event.platform}</div>
        )}

        <div className="flex -space-x-2 overflow-hidden mt-2">
          {event.participants.map((participant) => (
            <div key={participant.id} className="relative">
              <Avatar className="h-6 w-6 border-2 border-white">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {participant.confirmed !== undefined && (
                <div 
                  className="absolute -bottom-1 -right-1 rounded-full bg-white"
                  style={{ padding: "2px" }}
                >
                  {participant.confirmed ? (
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  ) : (
                    <Circle className="h-3 w-3 text-gray-300" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
