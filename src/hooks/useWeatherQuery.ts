import { useQuery } from "@tanstack/react-query";
import { useWeatherStore } from "../stores/useWeatherStore";
import { usePreferencesStore } from "../stores/usePreferencesStore";
import { fetchWeatherByCity, fetchWeatherByCoordinates } from "../api/weather";
import type { WeatherResponse } from "../types/weather";

export function useWeatherQuery() {
  const { city, coordinates } = useWeatherStore();
  const unit = usePreferencesStore((s) => s.unit);

  return useQuery<WeatherResponse>({
    queryKey: ["weather", city, coordinates, unit],
    queryFn: () => {
      if (city) {
        return fetchWeatherByCity(city, unit);
      }
      if (coordinates) {
        return fetchWeatherByCoordinates(
          coordinates.lat,
          coordinates.lon,
          unit,
        );
      }
      throw new Error("No location provided");
    },
    enabled: Boolean(city || coordinates),
  });
}
