import { useWeatherStore } from "../../stores/useWeatherStore";

export default function RecentSearches() {
  const recentSearches = useWeatherStore((s) => s.recentSearches);
  const setCity = useWeatherStore((s) => s.setCity);

  if (recentSearches.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
        Recent Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((city) => (
          <button
            key={city}
            onClick={() => setCity(city)}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
