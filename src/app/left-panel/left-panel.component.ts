import { Component } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent {
  hotel: Hotel | null = null;
  isEditing = false;
  editForm: Partial<Hotel> = {};
  loading = true;
  error: string | null = null;

  constructor(public hotelService: HotelService) {
    this.hotelService.selectedHotelId$.subscribe((id) => this.updateHotelSelection(id));
  }
  updateHotelSelection(id?: number | null): void {
    if (!id) {
      this.hotel = null;
      return;
    }
    this.loading = true;
    this.error = null;
    const found = this.hotelService.getHotelById(id);
    if (found) {
      this.hotel = { ...found };
      this.editForm = { ...found };
    } else {
      this.error = 'Hotel not found';
    }
    this.loading = false;
  }

  startEdit(): void {
    this.isEditing = true;
  }

  save(): void {
    if (!this.hotel) {
      return;
    }
    const updated: Hotel = { ...this.hotel, ...this.editForm } as Hotel;
    this.hotelService.updateHotel(updated);
    this.hotel = updated;
    this.editForm = { ...updated };
    this.isEditing = false;
  }

  cancel(): void {
    this.editForm = { ...this.hotel };
    this.isEditing = false;
  }

  navigateBack(): void {
    this.hotelService.navigateToSearch();
  }
}
