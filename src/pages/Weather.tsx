
import { useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correction pour les icônes de marqueur Leaflet
// (nécessaire car les chemins d'icônes par défaut ne fonctionnent pas correctement avec les bundlers)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Weather() {
  const QUEBEC_POSITION: [number, number] = [46.8139, -71.2080];
  const ZOOM_LEVEL = 7;
  const API_KEY = "0606032a1f036f7dec7c61361f00e9d8";

  // S'assurer que la hauteur de la carte est définie correctement
  useEffect(() => {
    const mapContainer = document.getElementById("weather-map");
    if (mapContainer) {
      mapContainer.style.height = "calc(100vh - 200px)";
    }
  }, []);

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Météo du Québec</h1>
        
        <div id="weather-map" className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <MapContainer
            center={QUEBEC_POSITION}
            zoom={ZOOM_LEVEL}
            style={{ height: "calc(100vh - 200px)", width: "100%" }}
          >
            <LayersControl position="topright">
              {/* Couche de base - OpenStreetMap */}
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              
              {/* Couche satellite */}
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  attribution='&copy; <a href="https://www.esri.com">Esri</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
              
              {/* Couches OpenWeatherMap */}
              <LayersControl.Overlay name="Nuages">
                <TileLayer
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                  url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                  opacity={0.6}
                />
              </LayersControl.Overlay>
              
              <LayersControl.Overlay name="Précipitations">
                <TileLayer
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                  url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                  opacity={0.6}
                />
              </LayersControl.Overlay>
              
              <LayersControl.Overlay name="Température">
                <TileLayer
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                  url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                  opacity={0.6}
                />
              </LayersControl.Overlay>
              
              <LayersControl.Overlay name="Radar">
                <TileLayer
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                  url={`https://tile.openweathermap.org/map/radar/{z}/{x}/{y}.png?appid=${API_KEY}`}
                  opacity={0.6}
                />
              </LayersControl.Overlay>
            </LayersControl>
            
            {/* Marqueur pour Québec */}
            <Marker position={QUEBEC_POSITION}>
              <Popup>
                <div>
                  <h2 className="font-semibold">Québec</h2>
                  <p>Capitale nationale du Québec</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
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
