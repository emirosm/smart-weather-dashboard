import { useWeatherStore } from "../stores/useWeatherStore";
import { usePreferencesStore } from "../stores/usePreferencesStore";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity } from "../api/weather";
import type { WeatherResponse } from "../types/weather";
import WeatherCard from "../components/weather/WeatherCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Favourites() {
  const favourites = useWeatherStore((s) => s.favourites);
  const unit = usePreferencesStore((s) => s.unit);

  const { data: weatherData, isLoading } = useQuery<WeatherResponse[]>({
    queryKey: ["weather", favourites, unit],
    queryFn: () =>
      Promise.all(favourites.map((city) => fetchWeatherByCity(city, unit))),
    enabled: favourites.length > 0,
  });

  if (favourites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Favourites
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No favourite locations added yet.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Favourites
          </h2>
          <LoadingSpinner size="lg" className="my-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Favourites
        </h2>
        <div className="grid gap-4">
          {weatherData?.map((data) => (
            <WeatherCard key={data.name} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
