import { MainLayout } from '@/components/MainLayout';
import { DailyMessage } from '@/components/dashboard/DailyMessage';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { FamilyProgress } from '@/components/dashboard/FamilyProgress';
import { User, CalendarCheck, CalendarRange, Plus, Trophy, PartyPopper, Star } from 'lucide-react';
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
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-white p-4 rounded-3xl shadow-inner min-h-screen animate-fadeInSlow">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              👨‍👩‍👧‍👦 Famille Grenier
              <Star className="text-yellow-500 animate-wiggle" />
            </h1>
            <p className="text-gray-500">{format(time, 'EEEE dd MMMM yyyy - HH:mm:ss', { locale: fr })}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><User className="w-4 h-4 mr-2" />Jour</Button>
            <Button variant="outline" size="sm"><CalendarCheck className="w-4 h-4 mr-2" />Semaine</Button>
            <Button variant="outline" size="sm"><CalendarRange className="w-4 h-4 mr-2" />Mois</Button>
            <div className="flex items-center bg-yellow-50 text-yellow-800 px-3 py-1 rounded-lg shadow-inner animate-pulse-slow">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" /> {points} points
            </div>
          </div>
        </header>

        <div className="bg-white shadow-md rounded-lg mb-4 p-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Widgets actifs</h2>
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Ajouter un widget</button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6">
            <DailyMessage />
            <WeatherCard />
            <Button
              className="w-full bg-green-50 text-green-700 hover:bg-green-100 transition rounded-lg animate-jumpIn"
              onClick={() => { addPoints(5); }}
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une tâche fictive
            </Button>
          </div>
          <div className="md:col-span-2 space-y-6">
            <FamilyProgress />
            <CalendarView />
            {badge && (
              <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg flex items-center gap-3 animate-bounce">
                <PartyPopper className="w-6 h-6 text-yellow-600" /> {badge} 🏆
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
