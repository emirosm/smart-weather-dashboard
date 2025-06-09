import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity } from "../api/weather";
import { useWeatherStore } from "../stores/useWeatherStore";
import { fetchWeatherByCoordinates } from "../api/weather";

export function useWeatherQuery() {
    const { city, coordinates, unit } = useWeatherStore();

    return useQuery({
      queryKey: ['weather', city, coordinates, unit],
      queryFn: () =>
        coordinates
          ? fetchWeatherByCoordinates(coordinates.lat, coordinates.lon, unit)
          : fetchWeatherByCity(city, unit),
      enabled: !!city || !!coordinates,
    });
}
