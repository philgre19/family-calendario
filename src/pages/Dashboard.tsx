
import { MainLayout } from "@/components/MainLayout";
import { DailyMessage } from "@/components/DailyMessage";
import { MorningRoutine } from "@/components/widgets/MorningRoutine";
import { DailyGoal } from "@/components/widgets/DailyGoal";
import { FamilyPoints } from "@/components/widgets/FamilyPoints";
import { ScreenTime } from "@/components/widgets/ScreenTime";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Message du jour - Optimisé pour l'espace */}
        <div className="mb-5">
          <DailyMessage />
        </div>

        {/* Grille principale des widgets - Optimisée pour 1920x1080 */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-0">
          <MorningRoutine />
          <DailyGoal />
          <FamilyPoints />
          <ScreenTime />

          {/* Deuxième rangée - Hauteur réduite */}
          <div className="calendar-card max-h-[180px]">
            <h3 className="text-lg font-medium mb-2">Prochains événements</h3>
            <div className="space-y-2 overflow-auto">
              <div className="bg-pastel-pink/20 p-2 rounded-lg">
                <p className="text-sm">09:00 - École Emma</p>
              </div>
              <div className="bg-pastel-blue/20 p-2 rounded-lg">
                <p className="text-sm">14:30 - Sport Lucas</p>
              </div>
            </div>
          </div>

          <div className="calendar-card max-h-[180px]">
            <h3 className="text-lg font-medium mb-2">Tâches en cours</h3>
            <div className="space-y-2 overflow-auto">
              <div className="bg-pastel-orange/20 p-2 rounded-lg">
                <p className="text-sm">Ranger la chambre - Emma</p>
              </div>
            </div>
          </div>

          <div className="calendar-card max-h-[180px]">
            <h3 className="text-lg font-medium mb-2">Météo</h3>
            <div className="bg-pastel-yellow/20 p-3 rounded-lg text-center">
              <p className="text-2xl font-medium">22°C</p>
              <p className="text-sm text-gray-600">Ensoleillé</p>
            </div>
          </div>

          <div className="calendar-card max-h-[180px]">
            <h3 className="text-lg font-medium mb-2">Points du jour</h3>
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-500">45</span>
              <span className="text-gray-500">/100</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
