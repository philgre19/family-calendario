import { MainLayout } from "@/components/MainLayout";
import { Calendar, CheckSquare, Sun } from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="container py-6 fade-in">
        <h1 className="text-3xl font-semibold mb-6">Tableau de bord familial</h1>
        
        <div className="grid gap-6">
          {/* Section Résumé rapide */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Événements du jour */}
            <div className="calendar-card group">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-medium">Aujourd'hui</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-pastel-pink/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">09:00 - École Emma</p>
                </div>
                <div className="bg-pastel-blue/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">14:30 - Sport Lucas</p>
                </div>
              </div>
            </div>

            {/* Prochaines tâches */}
            <div className="calendar-card group">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-medium">Prochaine tâche</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-pastel-orange/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">Ranger la chambre</p>
                  <p className="text-xs text-gray-600">Emma - Aujourd'hui</p>
                </div>
              </div>
            </div>

            {/* Météo du jour */}
            <div className="calendar-card group">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-medium">Météo</h2>
              </div>
              <div className="bg-pastel-yellow/30 p-3 rounded-lg text-center">
                <p className="text-2xl font-medium">22°C</p>
                <p className="text-sm text-gray-600">Ensoleillé</p>
              </div>
            </div>
          </section>

          {/* Autres widgets à venir */}
          <div className="grid gap-6">
            {/* Contenu du tableau de bord à venir */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
