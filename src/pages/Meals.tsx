
import { MainLayout } from "@/components/MainLayout";

export default function Meals() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Planification des Repas</h1>
        <div className="grid gap-6">
          {/* Contenu de la planification des repas à venir */}
        </div>
      </div>
    </MainLayout>
  );
}
