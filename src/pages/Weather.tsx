
import { MainLayout } from "@/components/MainLayout";

export default function Weather() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Météo</h1>
        <div className="grid gap-6">
          {/* Contenu météo à venir */}
        </div>
      </div>
    </MainLayout>
  );
}
