
import { MainLayout } from "@/components/MainLayout";

export default function ShoppingList() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Liste de Courses</h1>
        <div className="grid gap-6">
          {/* Contenu de la liste de courses à venir */}
        </div>
      </div>
    </MainLayout>
  );
}
