import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/database.types';
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
}

export function CalendarView() {
  const [view, setView] = useState<string>(Views.MONTH);
  const [date, setDate] = useState(new Date());

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
      }));
    },
  });

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

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex gap-2">
          <button 
            onClick={() => handleNavigate(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Aujourd'hui
          </button>
          <div className="flex gap-1">
            <button 
              onClick={() => handleNavigate(new Date(date.setMonth(date.getMonth() - 1)))}
              className="p-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              ←
            </button>
            <button 
              onClick={() => handleNavigate(new Date(date.setMonth(date.getMonth() + 1)))}
              className="p-2 text-gray-700 hover:bg-gray-50 rounded-md"
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
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${view === viewKey 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
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

      <AnimatePresence mode="wait">
        <motion.div 
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 p-4"
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view as any}
            onView={handleViewChange}
            onNavigate={handleNavigate}
            date={date}
            views={views}
            eventPropGetter={eventStyleGetter}
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
