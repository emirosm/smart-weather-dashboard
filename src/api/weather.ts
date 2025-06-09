import type { WeatherResponse } from '../types/weather';


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherByCity(
  city: string,
  unit: "metric" | "imperial" = "metric"
): Promise<WeatherResponse> {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=${unit}`
  );

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "API error");
  }

  return response.json();
}

export async function fetchWeatherByCoordinates(
    lat: number,
    lon: number,
    unit: 'metric' | 'imperial' = 'metric'
  ): Promise<WeatherResponse> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
    );
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to fetch weather by coordinates');
    }
  
    return res.json();
  }