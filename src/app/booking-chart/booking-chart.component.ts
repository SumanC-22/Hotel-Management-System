import { Component, Input } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-booking-chart',
  templateUrl: './booking-chart.component.html',
  styleUrls: ['./booking-chart.component.css'],
})
export class BookingChartComponent {
  @Input() hotel!: Hotel;

  get bars() {
    const max = Math.max(...this.hotel.monthlyBookings);
    return this.hotel.monthlyBookings.map((value, index) => ({
      month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][index],
      value,
      width: max ? Math.round((value / max) * 100) : 0,
    }));
  }
}
