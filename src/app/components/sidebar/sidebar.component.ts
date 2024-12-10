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
  newCityName: string = '';
  activeCityName: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.favoriteCities = this.weatherService.getFavoriteCities();
    this.updateWeatherData();
    this.selectCity('Oradea');
  }

  selectCity(cityName: string) {
    this.activeCityName = cityName;
    this.weatherService.setCity(cityName);
  }
  addCity() {
    if (this.newCityName.trim()) {
      this.weatherService.getCurrentWeather(this.newCityName).subscribe({
        next: () => {
          if (this.weatherService.addFavoriteCity(this.newCityName)) {
            this.newCityName = '';
          } else {
            alert('City already in favorites!');
          }
        },
        error: () => {
          alert('City not found! Please check the name.');
        },
      });
    }
  }

  removeCity(event: Event, cityName: string) {
    event.stopPropagation();
    this.weatherService.removeFavoriteCity(cityName);
    this.favoriteCities = this.weatherService.getFavoriteCities();
  }

  private updateWeatherData() {
    this.favoriteCities.forEach((city) => {
      this.weatherService.updateFavoriteCityWeather(city);
    });
  }
}
