
import { MainLayout } from "@/components/MainLayout";
import dynamic from "@/utils/dynamicImport";
import { Suspense } from "react";

// Importation dynamique du composant WeatherMap avec SSR désactivé
const WeatherMap = dynamic(
  () => import("@/components/WeatherMap"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-200px)] w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Chargement de la carte météo...</p>
      </div>
    )
  }
);

export default function Weather() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Météo du Québec</h1>
        
        <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <WeatherMap />
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Données météorologiques fournies par{" "}
            <a 
              href="https://openweathermap.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenWeatherMap
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
