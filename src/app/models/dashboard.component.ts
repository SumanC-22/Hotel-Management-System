import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HotelService } from '../hotel.service';
import { Hotel } from './hotel.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  hotels: Hotel[] = [];
  loading = false;
  error: string | null = null;

  private subs = new Subscription();

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subs.add(
      this.hotelService.hotels$.subscribe(list => {
        this.hotels = list || [];
        this.loading = false;
      })
    );

    this.subs.add(this.hotelService.loading$.subscribe(v => (this.loading = v)));
    this.subs.add(this.hotelService.error$.subscribe(e => (this.error = e)));

    // Ensure hotels loaded (resolver will usually handle this, but call as fallback)
    this.hotelService.loadHotelsAsync().catch(() => {});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  goToSearch() {
    this.hotelService.navigateToSearch();
  }
}