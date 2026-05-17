import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './models/dashboard.component';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { HotelDetailsComponent } from './hotel-search/hotel-details.component';
import { HotelResolver } from './models/hotel-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'search', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    resolve: { hotels: HotelResolver }
  },
  {
    path: 'search',
    component: HotelSearchComponent,
    resolve: { hotels: HotelResolver }
  },
  {
    path: 'hotel/:id',
    component: HotelDetailsComponent,
    resolve: { hotels: HotelResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }