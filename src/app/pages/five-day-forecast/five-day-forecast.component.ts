// src/app/pages/five-day-forecast/five-day-forecast.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
})
export class FiveDayForecastComponent implements OnInit {
  forecastData: any;
  dailyForecast: any[] = [];
  city: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.currentCity.subscribe((city) => {
      this.city = city;
      this.getForecast();
    });
  }

  getForecast() {
    this.weatherService.getHourlyForecast(this.city).subscribe((data) => {
      this.forecastData = data;
      this.processForecast(data);
    });
  }

  processForecast(data: any) {
    const dailyData: { [key: string]: any[] } = {};
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    this.dailyForecast = Object.keys(dailyData).map((date) => {
      const dayItems = dailyData[date];
      const temps = dayItems.map((item) => item.main.temp);
      return {
        date: date,
        tempMin: Math.min(...temps),
        tempMax: Math.max(...temps),
        weather: dayItems[0].weather[0].description,
        precipitation:
          dayItems.reduce((acc, item) => acc + item.pop, 0) / dayItems.length,
      };
    });
  }
}
