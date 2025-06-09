import { useWeatherStore } from '../stores/useWeatherStore';
import { MapPin } from "lucide-react";

interface UseMyLocationProps {
  className?: string;
}

export default function UseMyLocation({ className }: UseMyLocationProps) {
  const setCoordinates = useWeatherStore((s) => s.setCoordinates);
  const addRecentSearch = useWeatherStore((s) => s.addRecentSearch);

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoordinates({ lat: latitude, lon: longitude });

        // Reverse geocode for city name
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
          );
          const data = await res.json();
          if (data[0]?.name) {
            addRecentSearch(data[0].name);
          }
        } catch {
          // Skip if reverse geocode fails
        }
      },
      () => alert('Failed to get location.')
    );
  };

  return (
    <button
      onClick={handleLocationClick}
      className={`bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-500 transition-colors flex items-center justify-center gap-1 flex-shrink-0 ${className}`}
    >
      <MapPin className="w-4 h-4" />
      Use My Location
    </button>
  );
}
