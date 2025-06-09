export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
  }>;
  city: {
    name: string;
    country: string;
  };
}

export type Unit = 'metric' | 'imperial';
export type Theme = 'light' | 'dark';
export type ChartType = 'temp' | 'humidity' | 'wind';

export interface Coordinates {
  lat: number;
  lon: number;
}
