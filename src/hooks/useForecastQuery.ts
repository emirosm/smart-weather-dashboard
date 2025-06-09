import { useQuery } from "@tanstack/react-query";
import { useWeatherStore } from "../stores/useWeatherStore";
import { usePreferencesStore } from "../stores/usePreferencesStore";
import { fetchForecastByCity } from "../api/forecast";
import type { ForecastResponse } from "../types/forecast";

export function useForecastQuery() {
  const { city, coordinates } = useWeatherStore();
  const unit = usePreferencesStore((s) => s.unit);

  return useQuery<ForecastResponse>({
    queryKey: ["forecast", city, coordinates, unit],
    queryFn: () => {
      if (city) {
        return fetchForecastByCity(city, unit);
      }
      throw new Error("No location provided");
    },
    enabled: Boolean(city),
  });
}
