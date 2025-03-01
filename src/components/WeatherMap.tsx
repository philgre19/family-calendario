
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Coordonnées et configuration
const QUEBEC_POSITION: [number, number] = [46.8139, -71.2080];
const ZOOM_LEVEL = 7;
const API_KEY = "0606032a1f036f7dec7c61361f00e9d8";

export default function WeatherMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-[calc(100vh-200px)] w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    );
  }

  return <ClientSideMap />;
}

// Ce composant ne sera rendu que côté client
function ClientSideMap() {
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function initializeMap() {
      try {
        // Import dynamique de Leaflet
        const leaflet = await import("leaflet");
        
        if (!isMounted) return;
        
        // Fix pour les icônes Leaflet par défaut
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Initialisation de la carte
        const mapContainer = document.getElementById("weather-map");
        if (mapContainer) {
          mapContainer.style.height = "calc(100vh - 200px)";
          
          const mapInstance = leaflet.map("weather-map").setView(QUEBEC_POSITION, ZOOM_LEVEL);
          
          // Ajout des couches de base
          const osmLayer = leaflet.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          ).addTo(mapInstance);
          
          const satelliteLayer = leaflet.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution: '&copy; <a href="https://www.esri.com">Esri</a>'
            }
          );
          
          // Ajout des couches météo
          const cloudsLayer = leaflet.tileLayer(
            `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            {
              attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
              opacity: 0.6
            }
          );
          
          const precipitationLayer = leaflet.tileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            {
              attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
              opacity: 0.6
            }
          );
          
          const temperatureLayer = leaflet.tileLayer(
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            {
              attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
              opacity: 0.6
            }
          );
          
          // Création des couches de base et des superpositions pour le contrôle des couches
          const baseLayers = {
            "OpenStreetMap": osmLayer,
            "Satellite": satelliteLayer
          };
          
          const overlays = {
            "Nuages": cloudsLayer,
            "Précipitations": precipitationLayer,
            "Température": temperatureLayer
          };
          
          // Ajout du contrôle des couches
          leaflet.control.layers(baseLayers, overlays, { position: "topright" }).addTo(mapInstance);
          
          // Ajout d'un marqueur pour la ville de Québec
          const marker = leaflet.marker(QUEBEC_POSITION).addTo(mapInstance);
          marker.bindPopup("<div><h2 class='font-semibold'>Québec</h2><p>Capitale nationale du Québec</p></div>");
          
          if (isMounted) {
            setMap(mapInstance);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la carte:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    initializeMap();
    
    // Fonction de nettoyage
    return () => {
      isMounted = false;
      if (map) {
        map.remove();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-200px)] w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    );
  }
  
  return (
    <div 
      id="weather-map" 
      className="h-[calc(100vh-200px)] w-full"
    />
  );
}
