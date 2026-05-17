import { Component, Input } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.css'],
})
export class DashboardWidgetsComponent {
  @Input() hotel!: Hotel;

  get currencySymbol(): string {
    return this.hotel.currency === 'INR'
      ? '₹'
      : this.hotel.currency === 'USD'
      ? '$'
      : this.hotel.currency === 'EUR'
      ? '€'
      : '£';
  }

  get widgets() {
    return [
      { title: 'Last Service Used', value: this.hotel.lastUsed },
      { title: 'Confirmed Bookings', value: String(this.hotel.confirmedBookings) },
      { title: 'On Request Bookings', value: String(this.hotel.onRequestBookings) },
      { title: 'Next Booking Date', value: this.hotel.nextBookingDate },
      { title: 'Open Complaints', value: `${this.hotel.openComplaints} / ${this.hotel.totalComplaints}` },
      { title: 'Total Amount', value: `${this.currencySymbol}${this.hotel.totalAmount.toLocaleString()}` },
    ];
  }
}
