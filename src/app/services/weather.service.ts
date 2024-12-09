// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FavoriteCity } from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private citySubject = new BehaviorSubject<string>('New York');
  currentCity = this.citySubject.asObservable();

  apiKey: string = '4a0f82fee1265faa9f0ddf5ce1449af5';

  private favoriteCities: FavoriteCity[] = [
    { name: 'Oradea' },
    { name: 'London' },
    { name: 'Paris' },
    { name: 'Tokyo' },
  ];

  constructor(private http: HttpClient) {}

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
      return true;
    }
    return false;
  }
}
