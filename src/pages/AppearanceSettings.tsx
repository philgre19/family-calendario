
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AppearanceSettings() {
  const [sidebarColor, setSidebarColor] = useState<string>(
    localStorage.getItem("sidebarColor") || "#0f31b3" 
  );
  const [dashboardColor, setDashboardColor] = useState<string>(
    localStorage.getItem("dashboardColor") || "#ffffff"
  );

  function handleSave() {
    localStorage.setItem("sidebarColor", sidebarColor);
    localStorage.setItem("dashboardColor", dashboardColor);
    toast.success("Apparence mise à jour !", {
      description: `Sidebar = ${sidebarColor}, Dashboard = ${dashboardColor}`
    });
    window.location.reload();
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Apparence</h1>
        <p className="text-gray-600">Personnalise les couleurs de l'application.</p>

        <div className="flex flex-col gap-4 max-w-sm mt-6">
          <div>
            <label className="mb-1 block font-medium">Couleur de la sidebar</label>
            <Input
              type="color"
              value={sidebarColor}
              onChange={(e) => setSidebarColor(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Couleur du dashboard</label>
            <Input
              type="color"
              value={dashboardColor}
              onChange={(e) => setDashboardColor(e.target.value)}
            />
          </div>

          <Button onClick={handleSave} className="mt-4">
            Sauvegarder
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
