import { MainLayout } from '@/components/MainLayout';
import { User, CalendarRange, Star, Sparkles, Cloud, Trophy, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { CalendarView } from '@/components/dashboard/CalendarView';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { DailyMessage } from '@/components/dashboard/DailyMessage';
export default function Dashboard() {
  const [points, setPoints] = useState(0);
  const [badge, setBadge] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const BADGES = [{
    threshold: 10,
    title: 'Départ en force',
    icon: '🚀',
    message: 'Bravo, tu démarres bien !'
  }, {
    threshold: 25,
    title: 'Super Organisateur',
    icon: '🏆',
    message: 'Tu gères comme un pro !'
  }, {
    threshold: 50,
    title: 'Champion de la Maison',
    icon: '🎖️',
    message: 'Toute la famille t\'admire !'
  }];
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
        duration: 5000
      });
    }
  }, [points, badge]);
  return <MainLayout>
      <div className="flex flex-col h-full bg-white p-4 overflow-hidden px-[4px] py-0">
        {/* Header compact */}
        <Header points={points} temperature={22} condition="clear" dailyWord="Détermination" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <WeatherCard />
          <DailyMessage />
          <motion.div className="bg-gray-50 rounded-lg p-4 shadow-sm" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Points Famille</h3>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold">{points}</span>
              <button onClick={() => setPoints(p => p + 5)} className="ml-auto text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors">
                +5 points
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="flex-1 overflow-auto">
          <CalendarView />
        </motion.div>

        {badge && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-yellow-100 text-yellow-900 p-3 rounded-lg flex items-center gap-2 mt-4 text-sm">
            {badge} 🏆
          </motion.div>}
      </div>
    </MainLayout>;
}