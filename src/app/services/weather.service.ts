// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FavoriteCity } from '../models/weather.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private citySubject = new BehaviorSubject<string>('Oradea');
  currentCity = this.citySubject.asObservable();
  private apiKey = environment.apiKey;
  private readonly STORAGE_KEY = 'favoriteCities';

  private favoriteCities: FavoriteCity[] = [];

  constructor(private http: HttpClient) {
    this.loadFavoriteCities();
  }

  private loadFavoriteCities() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.favoriteCities = stored ? JSON.parse(stored) : [
      { name: 'Oradea' },
      { name: 'London' },
      { name: 'Paris' },
      { name: 'Tokyo' },
    ];
  }

  private saveFavoriteCities() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favoriteCities));
  }

  setCity(city: string) {
    this.citySubject.next(city);
  }

  getCurrentWeather(city: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    );
  }

  getHourlyForecast(city: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`
    );
  }

  getFavoriteCities(): FavoriteCity[] {
    return this.favoriteCities;
  }
  updateFavoriteCityWeather(city: FavoriteCity) {
    this.getCurrentWeather(city.name).subscribe((data: any) => {
      city.temp = Math.round(data.main.temp);
      city.weather = data.weather[0].description;
    });
  }

  addFavoriteCity(cityName: string) {
    if (
      !this.favoriteCities.some(
        (city) => city.name.toLowerCase() === cityName.toLowerCase()
      )
    ) {
      const newCity: FavoriteCity = { name: cityName };
      this.favoriteCities.push(newCity);
      this.updateFavoriteCityWeather(newCity);
      this.saveFavoriteCities();
      return true;
    }
    return false;
  }

  removeFavoriteCity(cityName: string) {
    this.favoriteCities = this.favoriteCities.filter(
      city => city.name !== cityName
    );
    this.saveFavoriteCities();
  }
}
