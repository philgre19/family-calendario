
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Event {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string | null;
  platform: string | null;
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    confirmed: boolean | null;
    color: string;
  }>;
}

interface EventDetailsProps {
  event: Event | null;
  onClose: () => void;
  onConfirm: (confirmed: boolean) => void;
}

export const EventDetails = ({ event, onClose, onConfirm }: EventDetailsProps) => {
  if (!event) return null;

  return (
    <Dialog open={!!event} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div>
              {format(parseISO(event.start_date), "EEEE d MMMM", { locale: fr })}
            </div>
            <div>
              {format(parseISO(event.start_date), "HH:mm")} - {format(parseISO(event.end_date), "HH:mm")}
            </div>
          </div>

          <div className="text-sm">{event.description}</div>

          <div className="space-y-3">
            <div className="font-medium">Participants</div>
            <div className="flex flex-wrap gap-3">
              {event.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{participant.name}</span>
                  {participant.confirmed !== null && (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        participant.confirmed
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onConfirm(false)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="mr-2 h-4 w-4" />
              Je ne peux pas
            </Button>
            <Button
              onClick={() => onConfirm(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="mr-2 h-4 w-4" />
              Je confirme
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
