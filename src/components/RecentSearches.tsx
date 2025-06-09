import { useWeatherStore } from "../stores/useWeatherStore";

export default function RecentSearches() {
  const recent = useWeatherStore((s) => s.recentSearches);
  const setCity = useWeatherStore((s) => s.setCity);
  const addRecentSearch = useWeatherStore((s) => s.addRecentSearch);
  const currentCity = useWeatherStore((s) => s.city);

  if (recent.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold mb-2">Recent Searches</h4>
      <div className="flex gap-2 flex-wrap">
        {recent.map((city) => (
          <button
            key={city}
            onClick={() => {
              if (city.toLowerCase() !== currentCity.toLowerCase()) {
                setCity(city);
              }
              addRecentSearch(city); // ✅ Re-add to sort to top
            }}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
