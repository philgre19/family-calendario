
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface CalendarHeaderProps {
  date: Date;
  view: string;
  views: Record<string, boolean>;
  onNavigate: (date: Date) => void;
  onViewChange: (view: string) => void;
}

export function CalendarHeader({ date, view, views, onNavigate, onViewChange }: CalendarHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate(new Date())}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 
                     border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            Aujourd'hui
          </button>
          
          <div className="flex gap-1">
            <button 
              onClick={() => onNavigate(new Date(date.setMonth(date.getMonth() - 1)))}
              className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate(new Date(date.setMonth(date.getMonth() + 1)))}
              className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <h2 className="text-lg font-medium text-gray-900 ml-2">
            {format(date, 'MMMM yyyy', { locale: fr })}
          </h2>
        </div>

        <div className="flex gap-1">
          {Object.keys(views).map((viewKey) => (
            <button
              key={viewKey}
              onClick={() => onViewChange(viewKey)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                ${view === viewKey 
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {viewKey === 'month' ? 'Mois' :
               viewKey === 'week' ? 'Semaine' :
               viewKey === 'day' ? 'Jour' : 'Agenda'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
