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
    });
  }

  toggleUnit() {
    this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
    this.getWeather();
  }
}
