import { useEffect, useState } from 'react';

export const useWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Trois-Rivières&units=metric&lang=fr&appid=26d19dc2b2116ff5b2dfc45d73993771`
        );
        const data = await res.json();
        if (data.cod !== 200) throw new Error(data.message);
        setWeather(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, loading, error };
};
import { useWeather } from "@/hooks/useWeather";

export const WeatherCard = () => {
  const { weather, loading, error } = useWeather();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur météo : {error}</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-bold">Météo</h3>
      <p>{weather.name}</p>
      <p>{weather.weather[0].description}</p>
      <p className="text-2xl font-bold">{weather.main.temp}°C</p>
    </div>
  );
};
