
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon issue
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
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Set map height
    const mapContainer = document.getElementById("weather-map");
    if (mapContainer) {
      mapContainer.style.height = "calc(100vh - 200px)";
    }
    
    // Dynamically import react-leaflet components only on client-side
    import("react-leaflet").then(() => {
      setMapLoaded(true);
    });
  }, []);

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-6">Météo du Québec</h1>
        
        <div id="weather-map" className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
          {mapLoaded ? (
            <MapComponent 
              position={QUEBEC_POSITION} 
              zoom={ZOOM_LEVEL} 
              apiKey={API_KEY} 
            />
          ) : (
            <div className="h-[calc(100vh-200px)] w-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Chargement de la carte...</p>
            </div>
          )}
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

// Client-side only component
function MapComponent({ position, zoom, apiKey }: { position: [number, number]; zoom: number; apiKey: string }) {
  // This component only runs on the client, so we can safely import and use react-leaflet
  const { MapContainer, TileLayer, LayersControl, Marker, Popup } = require("react-leaflet");
  
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: "calc(100vh - 200px)", width: "100%" }}
    >
      <LayersControl position="topright">
        {/* Base layers */}
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        
        {/* Weather overlays */}
        <LayersControl.Overlay name="Nuages">
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.6}
          />
        </LayersControl.Overlay>
        
        <LayersControl.Overlay name="Précipitations">
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.6}
          />
        </LayersControl.Overlay>
        
        <LayersControl.Overlay name="Température">
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.6}
          />
        </LayersControl.Overlay>
        
        <LayersControl.Overlay name="Radar">
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/radar/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.6}
          />
        </LayersControl.Overlay>
      </LayersControl>
      
      {/* Marker for Quebec */}
      <Marker position={position}>
        <Popup>
          <div>
            <h2 className="font-semibold">Québec</h2>
            <p>Capitale nationale du Québec</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
