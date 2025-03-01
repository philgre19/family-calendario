
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import dynamic from "@/utils/dynamicImport";

// Importation dynamique du composant WeatherMap avec SSR désactivé
const WeatherMap = dynamic(
  () => import("@/components/WeatherMap"),
  { ssr: false }
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
