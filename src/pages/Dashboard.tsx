
import { MainLayout } from '@/components/MainLayout';
import { DailyMessage } from '@/components/dashboard/DailyMessage';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { User, CalendarRange, Star, Sparkles, Cloud, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { CalendarView } from '@/components/dashboard/CalendarView';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [points, setPoints] = useState(0);
  const [badge, setBadge] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  const BADGES = [
    { threshold: 10, title: 'Départ en force', icon: '🚀', message: 'Bravo, tu démarres bien !' },
    { threshold: 25, title: 'Super Organisateur', icon: '🏆', message: 'Tu gères comme un pro !' },
    { threshold: 50, title: 'Champion de la Maison', icon: '🎖️', message: 'Toute la famille t\'admire !' }
  ];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextBadge = BADGES.find(b => points >= b.threshold && badge !== b.title);
    if (nextBadge) {
      setBadge(nextBadge.title);
      toast.success(`${nextBadge.title} débloqué !`, {
        icon: nextBadge.icon,
        description: nextBadge.message,
        duration: 5000,
      });
    }
  }, [points, badge]);

  return (
    <MainLayout>
      <div className="flex flex-col h-full bg-white p-4 overflow-hidden">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-2">
              👨‍👩‍👧‍👦 Famille Grenier
              <Star className="text-yellow-500 animate-pulse" />
            </h1>
            <p className="text-gray-500 text-sm">
              {format(time, 'EEEE dd MMMM yyyy - HH:mm:ss', { locale: fr })}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl shadow-sm"
          >
            {/* Mot du jour */}
            <div className="flex items-center gap-3 px-4 border-r border-gray-200">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Mot du jour</h3>
                <p className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Détermination 💪
                </p>
              </div>
            </div>

            {/* Météo */}
            <div className="flex items-center gap-3 px-4 border-r border-gray-200">
              <Cloud className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Météo</h3>
                <p className="text-lg font-semibold">22°C ☀️</p>
              </div>
            </div>

            {/* Points */}
            <div className="flex items-center gap-3 px-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Points Famille</h3>
                <p className="text-lg font-semibold">{points} points ⭐</p>
              </div>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto"
        >
          <CalendarView />
        </motion.div>

        {badge && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-100 text-yellow-900 p-4 rounded-lg flex items-center gap-3 mt-4 shadow-md"
          >
            {badge} 🏆
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
