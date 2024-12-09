// src/app/pages/hourly-forecast/hourly-forecast.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { HourlyForecast } from '../../models/weather.interface';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss'],
})
export class HourlyForecastComponent implements OnInit {
  forecastData: HourlyForecast | null = null;
  city: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.currentCity.subscribe((city) => {
      this.city = city;
      this.getForecast();
    });
  }

  getForecast() {
    this.weatherService.getHourlyForecast(this.city).subscribe((data: any) => {
      this.forecastData = data as HourlyForecast;
      this.forecastData = data;
    });
  }
}
