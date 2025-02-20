
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
    allDay: true,
    className: 'bg-yellow-100'
  },
  {
    title: 'Réunion famille 🏠',
    start: new Date(2025, 1, 25),
    end: new Date(2025, 1, 25),
    allDay: true,
    className: 'bg-blue-100'
  },
];

const eventStyleGetter = (event: any) => {
  return {
    className: `${event.className} p-2 rounded-lg shadow-sm border-none`,
    style: {
      border: 'none'
    }
  };
};

export default function CalendarView() {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Aujourd'hui
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Précédent
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Suivant
          </button>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">février 2025</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Mois
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Semaine
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Jour
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Agenda
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          style={{ height: '100%' }}
          culture="fr"
          eventPropGetter={eventStyleGetter}
          messages={{
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
            today: "Aujourd'hui",
            agenda: 'Agenda',
            previous: 'Précédent',
            next: 'Suivant',
          }}
          className="custom-calendar"
        />
      </div>
    </div>
  );
}
