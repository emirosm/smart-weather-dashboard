import { useWeatherStore } from "../stores/useWeatherStore";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity } from "../api/weather";
import type { WeatherResponse } from "../types/weather";

function FavouriteCard({ city }: { city: string }) {
  const { data, isLoading, isError } = useQuery<WeatherResponse>({
    queryKey: ["weather-fav", city],
    queryFn: () => fetchWeatherByCity(city),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <p>Loading {city}...</p>;
  if (isError || !data) return <p>Error loading {city}</p>;

  const weather = data.weather[0]; // contains main, description, icon

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 w-full max-w-md flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p className="text-3xl">{data.main.temp}°</p>
        <p className="capitalize">{weather.description}</p>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="w-16 h-16"
      />
    </div>
  );
}

export default function Favourites() {
  const favourites = useWeatherStore((s) => s.favourites);

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">⭐ Favourite Locations</h1>
      {favourites.length === 0 ? (
        <p>You have no favourite cities yet.</p>
      ) : (
        <div className="grid gap-4">
          {favourites.map((city) => (
            <FavouriteCard key={city} city={city} />
          ))}
        </div>
      )}
    </div>
  );
}
