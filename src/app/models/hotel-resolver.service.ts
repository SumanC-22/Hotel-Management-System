import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelService } from '../hotel.service';
import { Hotel } from './hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelResolver implements Resolve<Hotel[]> {
  constructor(private hotelService: HotelService) {}

  resolve(): Observable<Hotel[]> {
    return this.hotelService.loadHotels();
  }
}