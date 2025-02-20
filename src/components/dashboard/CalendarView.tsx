
import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/database.types';
import { CalendarHeader } from './calendar/CalendarHeader';
import { EventComponent } from './calendar/EventComponent';
import { getEventColor, calendarMessages } from './calendar/utils';
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

export function CalendarView() {
  const [view, setView] = useState<string>(Views.WEEK);
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
        badges: ['meal', 'sport', 'school', 'appointment'].filter(() => Math.random() > 0.5),
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

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <CalendarHeader
        date={date}
        view={view}
        views={views}
        onNavigate={handleNavigate}
        onViewChange={handleViewChange}
      />

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
            components={{ event: EventComponent }}
            messages={calendarMessages}
            popup
            className="custom-calendar"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
