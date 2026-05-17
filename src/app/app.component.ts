import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelService } from './hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentView$: Observable<string>;

  constructor(private hotelService: HotelService, private router: Router) {
    this.currentView$ = this.hotelService.currentView$;
  }

  ngOnInit(): void {
    // Ensure initial navigation to the search page so router-outlet shows content
    if (this.router.url === '/' || this.router.url === '') {
      this.router.navigate(['/search']);
    }
  }
}
