// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private citySubject = new BehaviorSubject<string>('New York');
  currentCity = this.citySubject.asObservable();

  apiKey: string = '4a0f82fee1265faa9f0ddf5ce1449af5';

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
}
