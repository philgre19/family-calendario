
import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/database.types';
import { Utensils, Running, School, CalendarCheck } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: fr }),
  getDay,
  locales,
});

const views = {
  month: true,
  week: true,
  day: true,
  agenda: true,
};

interface CalendarEvent extends Event {
  start: Date;
  end: Date;
  className: string;
  color?: string;
  badges?: string[];
}

const eventBadgeIcons: Record<string, React.ReactNode> = {
  meal: <Utensils size={12} />,
  sport: <Running size={12} />,
  school: <School size={12} />,
  appointment: <CalendarCheck size={12} />,
};

export function CalendarView() {
  const [view, setView] = useState<string>(Views.WEEK); // Changed default to week view
  const [date, setDate] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const { data: events = [] } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          participants:event_participants(
            member_id,
            status
          )
        `)
        .order('start_date', { ascending: true });

      if (error) throw error;

      return (data as Event[]).map(event => ({
        ...event,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
        className: `event-${event.type || 'default'}`,
        badges: ['meal', 'sport', 'school', 'appointment'].filter(() => Math.random() > 0.5), // Simulation pour la démo
      }));
    },
  });

  const filteredEvents = selectedMember
    ? events.filter(event => event.member_id === selectedMember)
    : events;

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView: string) => {
    setView(newView);
  }, []);

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    return {
      className: `${event.className} p-2 rounded-lg shadow-sm border-none transition-all duration-200 hover:scale-[1.02]`,
      style: {
        backgroundColor: event.color || getEventColor(event.type),
        border: 'none',
      }
    };
  }, []);

  const getEventColor = (type?: string) => {
    switch (type) {
      case 'birthday':
        return '#FCD34D';
      case 'family':
        return '#34D399';
      case 'important':
        return '#EF4444';
      default:
        return '#4F46E5';
    }
  };

  const components = {
    event: (props: any) => (
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
    ),
  };

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button 
            onClick={() => handleNavigate(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm
                     border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Aujourd'hui
          </button>
          <div className="flex gap-1">
            <button 
              onClick={() => handleNavigate(new Date(date.setMonth(date.getMonth() - 1)))}
              className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              ←
            </button>
            <button 
              onClick={() => handleNavigate(new Date(date.setMonth(date.getMonth() + 1)))}
              className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          {format(date, 'MMMM yyyy', { locale: fr })}
        </h2>

        <div className="flex gap-2">
          {Object.keys(views).map((viewKey) => (
            <button
              key={viewKey}
              onClick={() => handleViewChange(viewKey)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${view === viewKey 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                }`}
            >
              {viewKey === 'month' ? 'Mois' :
               viewKey === 'week' ? 'Semaine' :
               viewKey === 'day' ? 'Jour' : 'Agenda'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-6 px-2">
        {['Alice', 'Bob', 'Charlie'].map((member, index) => (
          <motion.div
            key={member}
            className="member-bubble"
            onClick={() => setSelectedMember(selectedMember === member ? null : member)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="member-bubble-avatar"
              style={{
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1'][index],
                opacity: selectedMember && selectedMember !== member ? 0.5 : 1
              }}
            >
              {member[0]}
            </div>
            <div className="member-bubble-progress">
              <div 
                className="member-bubble-progress-bar"
                style={{
                  width: `${Math.random() * 100}%`,
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1'][index]
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view as any}
            onView={handleViewChange}
            onNavigate={handleNavigate}
            date={date}
            views={views}
            eventPropGetter={eventStyleGetter}
            components={components}
            messages={{
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
              agenda: 'Agenda',
              today: "Aujourd'hui",
              previous: 'Précédent',
              next: 'Suivant',
              noEventsInRange: 'Aucun événement dans cette période',
            }}
            popup
            className="custom-calendar"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
