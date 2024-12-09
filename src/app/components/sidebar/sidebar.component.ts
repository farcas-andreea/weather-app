// src/app/components/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FavoriteCity } from 'src/app/models/weather.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  favoriteCities: FavoriteCity[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.favoriteCities = this.weatherService.getFavoriteCities();
    this.updateWeatherData();
  }

  selectCity(cityName: string) {
    this.weatherService.setCity(cityName);
  }

  private updateWeatherData() {
    this.favoriteCities.forEach((city) => {
      this.weatherService.updateFavoriteCityWeather(city);
    });
  }
}
