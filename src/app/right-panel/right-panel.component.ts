import { Component } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css'],
})
export class RightPanelComponent {
  hotel: Hotel | null = null;
  activeTab = 'home';

  constructor(public hotelService: HotelService) {
    this.hotelService.selectedHotelId$.subscribe((id) => this.updateHotel(id));
  }

  updateHotel(id?: number | null): void {
    this.hotel = id ? this.hotelService.getHotelById(id) ?? null : null;
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }
}
