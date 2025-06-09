import type {
  WeatherResponse,
  ForecastResponse,
  Unit,
  Coordinates,
} from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || "An error occurred");
  }

  return data;
}

async function fetchWithError(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed: ${response.statusText}`,
    );
  }
  return response.json();
}

export async function fetchWeatherByCity(
  city: string,
  unit: Unit,
): Promise<WeatherResponse> {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`;
  return fetchWithError(url);
}

export async function fetchWeatherByCoordinates(
  coords: Coordinates,
  unit: Unit,
): Promise<WeatherResponse> {
  const url = `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&units=${unit}&appid=${API_KEY}`;
  return fetchWithError(url);
}

export async function fetchForecastByCity(
  city: string,
  unit: Unit,
): Promise<ForecastResponse> {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`;
  return fetchWithError(url);
}

export async function fetchForecastByCoordinates(
  coords: Coordinates,
  unit: Unit,
): Promise<ForecastResponse> {
  const url = `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&units=${unit}&appid=${API_KEY}`;
  return fetchWithError(url);
}

export async function reverseGeocode(
  coords: Coordinates,
): Promise<{ name: string }> {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${API_KEY}`;
  const data = await fetchWithError(url);
  return data[0];
}
