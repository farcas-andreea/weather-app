// src/app/models/weather.interface.ts
export interface HourlyForecast {
  city: {
    name: string;
    country: string;
  };
  list: ForecastItem[];
}

export interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  pop: number;
  wind: {
    speed: number;
    deg: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

export interface FavoriteCity {
  name: string;
  temp?: number;
  weather?: string;
}
