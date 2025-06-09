import { useWeatherStore } from "../../stores/useWeatherStore";
import { usePreferencesStore } from "../../stores/usePreferencesStore";
import type { WeatherResponse } from "../../types/weather";

interface WeatherCardProps {
  data: WeatherResponse;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const isFavourite = useWeatherStore((s) => s.isFavourite);
  const addFavourite = useWeatherStore((s) => s.addFavourite);
  const removeFavourite = useWeatherStore((s) => s.removeFavourite);
  const unit = usePreferencesStore((s) => s.unit);

  const handleToggleFavourite = () => {
    if (isFavourite(data.name)) {
      removeFavourite(data.name);
    } else {
      addFavourite(data.name);
    }
  };

  const weather = data.weather[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6 text-center">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{data.name}</h2>
      <button
        onClick={handleToggleFavourite}
        className="text-sm mt-2 text-blue-600 dark:text-blue-400 hover:underline"
      >
        {isFavourite(data.name)
          ? "★ Remove from Favourites"
          : "☆ Add to Favourites"}
      </button>

      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="mx-auto"
      />
      <p className="text-4xl text-gray-900 dark:text-white">{data.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p className="capitalize text-gray-700 dark:text-gray-300">{weather.description}</p>
      <div className="text-sm mt-2 text-gray-600 dark:text-gray-300">
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
} 