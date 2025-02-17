
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
        {/* Message du jour - Plus compact */}
        <div className="mb-4">
          <DailyMessage />
        </div>

        {/* Grille principale des widgets */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {/* Première rangée */}
          <div className="col-span-4 grid grid-cols-4 gap-4 mb-4">
            <MorningRoutine />
            <DailyGoal />
            <FamilyPoints />
            <ScreenTime />
          </div>

          {/* Deuxième rangée */}
          <div className="col-span-4 grid grid-cols-4 gap-4">
            {/* Widgets supplémentaires */}
            <div className="col-span-1">
              <div className="calendar-card">
                <h3 className="text-lg font-medium mb-3">Prochains événements</h3>
                <div className="space-y-2">
                  <div className="bg-pastel-pink/20 p-2 rounded-lg">
                    <p className="text-sm">09:00 - École Emma</p>
                  </div>
                  <div className="bg-pastel-blue/20 p-2 rounded-lg">
                    <p className="text-sm">14:30 - Sport Lucas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="calendar-card">
                <h3 className="text-lg font-medium mb-3">Tâches en cours</h3>
                <div className="space-y-2">
                  <div className="bg-pastel-orange/20 p-2 rounded-lg">
                    <p className="text-sm">Ranger la chambre - Emma</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="calendar-card">
                <h3 className="text-lg font-medium mb-3">Météo</h3>
                <div className="bg-pastel-yellow/20 p-3 rounded-lg text-center">
                  <p className="text-2xl font-medium">22°C</p>
                  <p className="text-sm text-gray-600">Ensoleillé</p>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="calendar-card">
                <h3 className="text-lg font-medium mb-3">Points du jour</h3>
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-500">45</span>
                  <span className="text-gray-500">/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
