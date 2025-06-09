import type { ForecastResponse } from "../types/forecast";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchForecastByCity(
  city: string,
  unit: "metric" | "imperial" = "metric",
): Promise<ForecastResponse> {
  const res = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=${unit}`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch forecast");
  }
  return res.json();
}
