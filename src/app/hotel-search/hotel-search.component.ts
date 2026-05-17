import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { HotelService } from '../hotel.service';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit, OnDestroy {

  hotels$!: Observable<Hotel[]>;
  filteredHotels$!: Observable<Hotel[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  currentPage$!: Observable<number>;

  pageSize = 10;
  searchTerm = '';

  private destroy$ = new Subject<void>();

  constructor(public hotelService: HotelService) {

    this.hotels$ = this.hotelService.hotels$;
    this.filteredHotels$ = this.hotelService.filteredHotels$;
    this.loading$ = this.hotelService.loading$;
    this.error$ = this.hotelService.error$;
    this.currentPage$ = this.hotelService.currentPage$;

    this.pageSize = this.hotelService.pageSize;

  }

  ngOnInit(): void {

    this.hotelService.searchTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe((term) => {
        this.searchTerm = term;
      });

  }

  onSearch(): void {
    this.hotelService.setSearchTerm(this.searchTerm);
  }

  clearSearch(): void {

    this.searchTerm = '';
    this.hotelService.setSearchTerm('');

  }

  selectHotel(hotel: Hotel): void {

    this.hotelService.navigateToDetails(hotel.id);

  }

  changePage(page: number): void {

    this.hotelService.setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  getPageArray(total: number): number[] {

    const pages = Math.ceil(total / this.pageSize);

    return Array.from(
      { length: pages },
      (_, i) => i + 1
    );

  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

  }

}