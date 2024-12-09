import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { HourlyForecastComponent } from './pages/hourly-forecast/hourly-forecast.component';
import { FiveDayForecastComponent } from './pages/five-day-forecast/five-day-forecast.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrentWeatherComponent,
    HourlyForecastComponent,
    FiveDayForecastComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
