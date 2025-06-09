import { useQuery } from "@tanstack/react-query";
import { fetchForecastByCity } from "../api/forecast";
import { useWeatherStore } from "../stores/useWeatherStore";

export function useForecastQuery() {
  const city = useWeatherStore((s) => s.city);
  const unit = useWeatherStore((s) => s.unit);

  return useQuery({
    queryKey: ["forecast", city, unit],
    queryFn: () => fetchForecastByCity(city, unit),
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
  });
}
