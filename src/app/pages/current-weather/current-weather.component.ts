// src/app/pages/current-weather/current-weather.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  weatherData: any;
  city: string = '';
  unit: string = 'metric';
  originalTemp: number = 0;
  originalFeelsLike: number = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.currentCity.subscribe((city) => {
      this.city = city;
      this.getWeather();
    });
  }

  getWeather() {
    this.weatherService.getCurrentWeather(this.city).subscribe((data) => {
      this.weatherData = data;
      this.originalTemp = this.weatherData.main.temp;
      this.originalFeelsLike = this.weatherData.main.feels_like;
    });
  }

  getConvertedTemp(): number {
    if (this.unit === 'metric') {
      return this.originalTemp;
    }
    return (this.originalTemp * 9) / 5 + 32;
  }
  getConvertedFeelsLike(): number {
    if (this.unit === 'metric') {
      return this.originalFeelsLike;
    }
    return (this.originalFeelsLike * 9) / 5 + 32;
  }

  convertUnixTimestamp(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  toggleUnit() {
    this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
  }
}
