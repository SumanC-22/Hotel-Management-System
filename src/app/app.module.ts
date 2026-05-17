import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './models/dashboard.component';

import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { HotelDetailsComponent } from './hotel-search/hotel-details.component';
import { HotelMapComponent } from './hotel-map/hotel-map.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { BadgeComponent } from './ui/badge.component';
import { ButtonComponent } from './ui/button.component';
import { CardComponent } from './ui/card.component';
import { InputComponent } from './ui/input.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HotelSearchComponent,
    HotelDetailsComponent,
    HotelMapComponent,
    SafeUrlPipe,
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    InputComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgChartsModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
