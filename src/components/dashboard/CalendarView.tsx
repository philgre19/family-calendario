import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuration du calendrier pour le français
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

// Exemple d'événements
const events = [
  {
    title: 'Anniversaire Lucas 🎂',
    start: new Date(2025, 1, 20),
    end: new Date(2025, 1, 20),
  },
  {
    title: 'Réunion famille 🏠',
    start: new Date(2025, 1, 25),
    end: new Date(2025, 1, 25),
  },
];

export default function CalendarView() {
  return (
    <div className="bg-white shadow rounded-lg p-4 h-[500px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        style={{ height: '100%' }}
        culture="fr"
        messages={{
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          today: "Aujourd'hui",
          agenda: 'Agenda',
          previous: 'Précédent',
          next: 'Suivant',
        }}
      />
    </div>
  );
}
