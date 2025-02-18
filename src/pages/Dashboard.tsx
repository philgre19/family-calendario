
import { MainLayout } from "@/components/MainLayout";
import { DailyMessage } from "@/components/dashboard/DailyMessage";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { FamilyProgress } from "@/components/dashboard/FamilyProgress";
import { User, CalendarCheck, CalendarDays, CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* En-tête avec la date et la navigation */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                👨‍👩‍👧‍👦 Famille Martin
              </h1>
              <p className="text-gray-600">
                {format(new Date(), "EEEE dd MMMM yyyy", { locale: fr })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Jour
              </Button>
              <Button variant="outline" size="sm">
                <CalendarCheck className="w-4 h-4 mr-2" />
                Semaine
              </Button>
              <Button variant="outline" size="sm">
                <CalendarRange className="w-4 h-4 mr-2" />
                Mois
              </Button>
            </div>
          </div>
        </header>

        {/* Grille principale */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6">
            <DailyMessage />
            <WeatherCard />
          </div>
          <div className="md:col-span-2">
            <FamilyProgress />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
