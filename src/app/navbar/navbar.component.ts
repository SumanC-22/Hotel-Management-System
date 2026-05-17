import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelService, AppView } from '../hotel.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentView$: Observable<AppView>;

  constructor(private hotelService: HotelService) {
    this.currentView$ = this.hotelService.currentView$;
  }

  navigateToSearch(): void {
    this.hotelService.navigateToSearch();
  }
}
