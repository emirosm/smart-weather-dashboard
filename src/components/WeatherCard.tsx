import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { useWeatherStore } from "../stores/useWeatherStore";

export default function WeatherCard() {
  const { data, isLoading, isError, error } = useWeatherQuery();
  const isFavourite = useWeatherStore((s) => s.isFavourite);
  const addFavourite = useWeatherStore((s) => s.addFavourite);
  const removeFavourite = useWeatherStore((s) => s.removeFavourite);

  const handleToggleFavourite = () => {
    if (isFavourite(data.name)) {
      removeFavourite(data.name);
    } else {
      addFavourite(data.name);
    }
  };

  if (!data) return null;
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const weather = data.weather[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6 text-center">
      <h2 className="text-xl font-bold mb-2">{data.name}</h2>
      <button
        onClick={handleToggleFavourite}
        className="text-sm mt-2 text-blue-600 underline"
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
      <p className="text-4xl">{data.main.temp}°</p>
      <p className="capitalize">{weather.description}</p>
      <div className="text-sm mt-2 text-gray-600 dark:text-gray-300">
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}
