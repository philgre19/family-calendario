
import { MainLayout } from "@/components/MainLayout";
import { WeekCalendar } from "@/components/Calendar/WeekCalendar";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold fade-in">Calendrier Familial</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline">Aujourd'hui</Button>
            <div className="flex items-center rounded-lg border">
              {["Tout", "Actif", "Terminé"].map((filter) => (
                <Button
                  key={filter}
                  variant="ghost"
                  className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                >
                  {filter}
                </Button>
              ))}
            </div>
            <Button className="bg-[hsl(var(--emma-color))] hover:bg-[hsl(var(--emma-color-hover))] text-[hsl(var(--emma-color-hover))]">
              Ajouter un événement
            </Button>
          </div>
        </div>

        {/* Calendrier hebdomadaire */}
        <div className="fade-in">
          <WeekCalendar />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
