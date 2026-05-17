import { Component, Input } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-hotel-map',
  template: `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <p class="text-sm uppercase tracking-[0.24em] text-slate-500 mb-4">Property Location</p>
      <div #mapContainer class="h-80 w-full rounded-2xl border border-slate-100 overflow-hidden z-0"></div>
      <div class="mt-4 flex justify-between items-center text-sm text-slate-500">
        <span>{{ hotel.location }}, {{ hotel.state }}</span>
        <span class="font-mono text-xs">{{ hotel.latitude }}, {{ hotel.longitude }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HotelMapComponent {
  @Input() hotel!: Hotel;

  // Use a simple embed instead of Leaflet to avoid adding extra runtime deps
  get embedUrl(): string {
    const lat = this.hotel?.latitude ?? 0;
    const lng = this.hotel?.longitude ?? 0;
    const bbox = `${lng - 0.05},${lat - 0.035},${lng + 0.05},${lat + 0.035}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
  }
}