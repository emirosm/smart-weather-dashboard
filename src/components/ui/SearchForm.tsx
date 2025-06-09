import { useState } from "react";
import { useWeatherStore } from "../../stores/useWeatherStore";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const setCityInStore = useWeatherStore((s) => s.setCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setCityInStore(city.trim());
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
} 