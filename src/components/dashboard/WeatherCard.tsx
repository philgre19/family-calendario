
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, Loader } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'snow';
}

const weatherMessages = {
  clear: "Idéal pour jouer dehors ! 🌞",
  cloudy: "Parfait pour une balade en famille ! ⛅",
  rain: "Jeux de société et chocolat chaud ! 🎲",
  snow: "On fait un bonhomme de neige ? ⛄"
};

const WeatherIcon = ({ condition }: { condition: WeatherData['condition'] }) => {
  switch (condition) {
    case 'clear':
      return <Sun className="w-8 h-8 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="w-8 h-8 text-gray-400" />;
    case 'rain':
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    case 'snow':
      return <CloudSnow className="w-8 h-8 text-blue-300" />;
    default:
      return null;
  }
};

export function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un appel API météo
    setTimeout(() => {
      setWeather({
        temperature: 22,
        condition: 'clear'
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[120px]">
          <Loader className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/20 to-blue-500/20" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Météo</h3>
          <WeatherIcon condition={weather.condition} />
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-800">
            {weather.temperature}°C
          </div>
          <p className="text-gray-600">
            {weatherMessages[weather.condition]}
          </p>
        </div>
      </div>
    </Card>
  );
}
