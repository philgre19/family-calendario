
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarHeaderProps {
  date: Date;
  view: string;
  views: Record<string, boolean>;
  onNavigate: (date: Date) => void;
  onViewChange: (view: string) => void;
}

export function CalendarHeader({ date, view, views, onNavigate, onViewChange }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-2">
      <div className="flex gap-2">
        <button 
          onClick={() => onNavigate(new Date())}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm
                   border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          Aujourd'hui
        </button>
        <div className="flex gap-1">
          <button 
            onClick={() => onNavigate(new Date(date.setMonth(date.getMonth() - 1)))}
            className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            ←
          </button>
          <button 
            onClick={() => onNavigate(new Date(date.setMonth(date.getMonth() + 1)))}
            className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900">
        {format(date, 'MMMM yyyy', { locale: fr })}
      </h2>

      <div className="flex gap-2">
        {Object.keys(views).map((viewKey) => (
          <button
            key={viewKey}
            onClick={() => onViewChange(viewKey)}
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
  );
}
