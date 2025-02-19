import { MainLayout } from '@/components/MainLayout';
import { DailyMessage } from '@/components/dashboard/DailyMessage';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { User, CalendarCheck, CalendarRange, Plus, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import CalendarView from '@/components/dashboard/CalendarView';

export default function Dashboard() {
  const [points, setPoints] = useState(0);
  const [badge, setBadge] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  const BADGES = [
    { threshold: 10, title: 'Départ en force', icon: '🚀', message: 'Bravo, tu démarres bien !' },
    { threshold: 25, title: 'Super Organisateur', icon: '🏆', message: 'Tu gères comme un pro !' },
    { threshold: 50, title: 'Champion de la Maison', icon: '🎖️', message: 'Toute la famille t’admire !' },
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
  }, [points]);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
    toast.success(`⭐ +${amount} points gagnés !`);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full bg-white p-4 overflow-hidden">
        <header className="mb-4 flex justify-between items-center border-b pb-3">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-2">
              👨‍👩‍👧‍👦 Famille Grenier
              <Star className="text-yellow-500 animate-wiggle" />
            </h1>
            <p className="text-gray-500 text-sm">{format(time, 'EEEE dd MMMM yyyy - HH:mm:ss', { locale: fr })}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm"><User className="w-4 h-4 mr-2" />Jour</Button>
            <Button variant="outline" size="sm"><CalendarCheck className="w-4 h-4 mr-2" />Semaine</Button>
            <Button variant="outline" size="sm"><CalendarRange className="w-4 h-4 mr-2" />Mois</Button>
            <div className="flex items-center bg-yellow-100 text-yellow-900 px-3 py-1 rounded-lg shadow-inner animate-pulse-slow">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" /> {points} points
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DailyMessage />
          <WeatherCard />
        </div>

        <Button
          className="w-full bg-green-100 text-green-800 hover:bg-green-200 transition rounded-lg mb-6 shadow-md"
          onClick={() => { addPoints(5); }}
        >
          <Plus className="w-4 h-4 mr-2" /> Ajouter une tâche fictive
        </Button>

        <div className="flex-1 overflow-auto rounded-lg bg-gray-50 p-4 shadow-inner">
          <CalendarView />
        </div>

        {badge && (
          <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg flex items-center gap-3 animate-bounce mt-4 shadow-md">
            {badge} 🏆
          </div>
        )}
      </div>
    </MainLayout>
  );
}
