
import { MainLayout } from '@/components/MainLayout';
import { User, CalendarRange, Star, Sparkles, Cloud, Trophy, Users } from 'lucide-react';
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
        {/* En-tête compact */}
        <header className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              Famille Grenier
            </h1>
            <p className="text-sm text-gray-500">
              {format(time, 'EEEE dd MMMM yyyy', { locale: fr })}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 bg-gray-50/80 backdrop-blur-sm rounded-lg shadow-sm"
          >
            {/* Mot du jour */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">Mot du jour :</span>
                <span className="text-base font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Détermination
                </span>
              </div>
            </div>

            {/* Météo */}
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-400" />
              <span className="text-base">22°C ☀️</span>
            </div>

            {/* Points */}
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div className="flex items-center gap-1">
                <span className="text-base font-medium">{points}</span>
                <span className="text-sm text-gray-500">points ⭐</span>
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
            className="bg-yellow-100 text-yellow-900 p-3 rounded-lg flex items-center gap-2 mt-4 text-sm"
          >
            {badge} 🏆
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
