// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  city: string = '';

  constructor(private weatherService: WeatherService) {}

  searchCity() {
    this.weatherService.setCity(this.city);
  }
}
