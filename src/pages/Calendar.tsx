
import { MainLayout } from "@/components/MainLayout";

export default function Calendar() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Calendrier Familial</h1>
        <div className="grid gap-6">
          {/* Contenu du calendrier à venir */}
        </div>
      </div>
    </MainLayout>
  );
}
