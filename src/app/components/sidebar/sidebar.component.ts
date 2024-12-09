import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  city: string = '';

  constructor(private weatherService: WeatherService) {}

  searchCity() {
    this.weatherService.setCity(this.city);
  }
}
