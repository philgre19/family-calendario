
import { format } from 'date-fns';
import { Utensils, Activity, School, CalendarCheck } from 'lucide-react';

const eventBadgeIcons: Record<string, React.ReactNode> = {
  meal: <Utensils size={12} />,
  sport: <Activity size={12} />,
  school: <School size={12} />,
  appointment: <CalendarCheck size={12} />,
};

export function EventComponent(props: any) {
  return (
    <div className="relative p-1">
      <div className="font-medium">{props.title}</div>
      <div className="text-sm opacity-80">{format(props.event.start, 'HH:mm')}</div>
      <div className="absolute top-0 right-0 flex -space-x-1">
        {props.event.badges?.map((badge: string, index: number) => (
          <div
            key={badge}
            className={`event-badge event-badge-${badge}`}
            style={{ zIndex: props.event.badges.length - index }}
          >
            {eventBadgeIcons[badge]}
          </div>
        ))}
      </div>
    </div>
  );
}
