export interface ForecastResponse {
    list: {
      dt: number;
      main: {
        temp: number;
        humidity: number;
      };
      wind: {
        speed: number;
      };
      dt_txt: string;
    }[];
  }
  