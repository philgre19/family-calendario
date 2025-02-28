
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <motion.button 
            onClick={() => onNavigate(new Date())}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 
                     border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Aujourd'hui"
          >
            <Calendar className="w-4 h-4" />
            Aujourd'hui
          </motion.button>
          
          <div className="flex gap-1">
            <motion.button 
              onClick={() => onNavigate(new Date(date.setMonth(date.getMonth() - 1)))}
              className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Mois précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button 
              onClick={() => onNavigate(new Date(date.setMonth(date.getMonth() + 1)))}
              className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Mois suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <motion.h2 
            className="text-lg font-medium text-gray-900 ml-2"
            key={date.toISOString()}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {format(date, 'MMMM yyyy', { locale: fr })}
          </motion.h2>
        </div>

        <div className="flex gap-1">
          {Object.keys(views).map((viewKey) => (
            <motion.button
              key={viewKey}
              onClick={() => onViewChange(viewKey)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                ${view === viewKey 
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Vue ${
                viewKey === 'month' ? 'mois' :
                viewKey === 'week' ? 'semaine' :
                viewKey === 'day' ? 'jour' : 'agenda'
              }`}
            >
              {viewKey === 'month' ? 'Mois' :
               viewKey === 'week' ? 'Semaine' :
               viewKey === 'day' ? 'Jour' : 'Agenda'}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
