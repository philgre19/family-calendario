
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Coordinates and configuration
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
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return <ClientSideMap />;
}

// This component will only be rendered on the client side
function ClientSideMap() {
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function initializeMap() {
      try {
        console.log("Initializing map...");
        // Dynamic import of Leaflet
        const L = await import("leaflet");
        
        if (!isMounted) return;
        
        console.log("Leaflet loaded, setting up icons...");
        // Fix for default Leaflet icons
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Check if the DOM element exists before initializing the map
        const mapContainer = document.getElementById("weather-map");
        if (mapContainer) {
          console.log("Map container found, initializing...");
          mapContainer.style.height = "calc(100vh - 200px)";
          
          const mapInstance = L.map("weather-map").setView(QUEBEC_POSITION, ZOOM_LEVEL);
          
          // Add base layers
          const osmLayer = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          ).addTo(mapInstance);
          
          const satelliteLayer = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution: '&copy; <a href="https://www.esri.com">Esri</a>'
            }
          );
          
          // Add weather layers
          const cloudsLayer = L.tileLayer(
            `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            {
              attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
              opacity: 0.6
            }
          );
          
          const precipitationLayer = L.tileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            {
              attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
              opacity: 0.6
            }
          );
          
          const temperatureLayer = L.tileLayer(
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            {
              attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
              opacity: 0.6
            }
          );
          
          // Create base and overlay layers for layer control
          const baseLayers = {
            "OpenStreetMap": osmLayer,
            "Satellite": satelliteLayer
          };
          
          const overlays = {
            "Clouds": cloudsLayer,
            "Precipitation": precipitationLayer,
            "Temperature": temperatureLayer
          };
          
          // Add layer control
          L.control.layers(baseLayers, overlays, { position: "topright" }).addTo(mapInstance);
          
          // Add a marker for Quebec City
          const marker = L.marker(QUEBEC_POSITION).addTo(mapInstance);
          marker.bindPopup("<div><h2 class='font-semibold'>Quebec</h2><p>National capital of Quebec</p></div>");
          
          console.log("Map successfully initialized");
          
          if (isMounted) {
            setMap(mapInstance);
            setLoading(false);
          }
        } else {
          console.error("DOM element 'weather-map' not found");
          if (isMounted) {
            setError("Error: DOM element 'weather-map' not found");
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error initializing map:", error);
        if (isMounted) {
          setError(`Error initializing map: ${error}`);
          setLoading(false);
        }
      }
    }
    
    initializeMap();
    
    // Cleanup function
    return () => {
      console.log("Cleaning up map component");
      isMounted = false;
      if (map) {
        map.remove();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-200px)] w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-[calc(100vh-200px)] w-full flex items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
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
