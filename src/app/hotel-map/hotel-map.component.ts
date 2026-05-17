import { Component, Input } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-hotel-map',
  templateUrl: './hotel-map.component.html',
  styleUrls: ['./hotel-map.component.css'],
})
export class HotelMapComponent {
  @Input() hotel!: Hotel;

  get mapUrl(): string {
    const lat = this.hotel.latitude;
    const lng = this.hotel.longitude;
    const zoom = 12;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.1}%2C${lat - 0.07}%2C${lng + 0.1}%2C${lat + 0.07}&layer=mapnik&marker=${lat}%2C${lng}`;
  }
}
