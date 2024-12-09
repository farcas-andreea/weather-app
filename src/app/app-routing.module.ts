// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { HourlyForecastComponent } from './pages/hourly-forecast/hourly-forecast.component';
import { FiveDayForecastComponent } from './pages/five-day-forecast/five-day-forecast.component';

const routes: Routes = [
  { path: '', redirectTo: '/current-weather', pathMatch: 'full' },
  { path: 'current-weather', component: CurrentWeatherComponent },
  { path: 'hourly-forecast', component: HourlyForecastComponent },
  { path: 'five-day-forecast', component: FiveDayForecastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
