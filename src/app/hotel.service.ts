import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Hotel } from './models/hotel.model';
import { MockDataService } from './models/mock-data.service';

export type AppView = 'search' | 'dashboard' | 'details';

@Injectable({ providedIn: 'root' })
export class HotelService {
  // Public observables used across components
  readonly hotels$: Observable<Hotel[]>;
  readonly filteredHotels$: Observable<Hotel[]>;
  readonly loading$: Observable<boolean>;
  readonly error$: Observable<string | null>;
  readonly currentPage$: Observable<number>;
  readonly currentView$: Observable<AppView>;
  readonly selectedHotelId$: Observable<number | null>;
  readonly searchTerm$: Observable<string>;

  // Internal subjects
  private hotelsSubject = new BehaviorSubject<Hotel[]>([]);
  private filteredHotelsSubject = new BehaviorSubject<Hotel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private currentPageSubject = new BehaviorSubject<number>(1);
  private selectedHotelIdSubject = new BehaviorSubject<number | null>(null);
  private currentViewSubject = new BehaviorSubject<AppView>('search');
  private searchTermSubject = new BehaviorSubject<string>('');

  // Config
  pageSize = 20;

  constructor(private mock: MockDataService, private router: Router) {
    this.hotels$ = this.hotelsSubject.asObservable();
    this.filteredHotels$ = this.filteredHotelsSubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();
    this.error$ = this.errorSubject.asObservable();
    this.currentPage$ = this.currentPageSubject.asObservable();
    this.currentView$ = this.currentViewSubject.asObservable();
    this.selectedHotelId$ = this.selectedHotelIdSubject.asObservable();
    this.searchTerm$ = this.searchTermSubject.asObservable();
  }

  /**
   * Loads hotels from the mock data JSON (used by the route resolver).
   * Returns an Observable so it can be used directly in resolvers.
   */
  loadHotels(): Observable<Hotel[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.mock.getHotels().pipe(
      // simulate network/API delay
      delay(600),
      tap((hotels) => {
        this.hotelsSubject.next(hotels);
        this.filteredHotelsSubject.next(hotels);
        this.currentPageSubject.next(1);
        this.loadingSubject.next(false);
      }),
      catchError((err) => {
        const msg = err?.message || 'Failed to load hotels';
        this.errorSubject.next(msg);
        this.loadingSubject.next(false);
        throw err;
      })
    );
  }

  /**
   * Async helper that waits for hotels to be loaded (uses async/await internally).
   */
  async loadHotelsAsync(): Promise<Hotel[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    try {
      const hotels = await firstValueFrom(this.mock.getHotels().pipe(delay(600)));
      this.hotelsSubject.next(hotels);
      this.filteredHotelsSubject.next(hotels);
      this.currentPageSubject.next(1);
      return hotels;
    } catch (err: any) {
      const msg = err?.message || 'Failed to load hotels';
      this.errorSubject.next(msg);
      throw err;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  setSearchTerm(term: string): void {
    const normalized = term?.toString() || '';
    this.searchTermSubject.next(normalized);
    const hotels = this.hotelsSubject.value;
    this.filteredHotelsSubject.next(
      hotels.filter((h) =>
        (h.name || '').toLowerCase().includes(normalized.toLowerCase()) ||
        (h.location || '').toLowerCase().includes(normalized.toLowerCase())
      )
    );
    this.currentPageSubject.next(1);
  }

  setCurrentPage(page: number): void {
    this.currentPageSubject.next(page);
  }

  navigateToDetails(id: number): void {
    this.selectedHotelIdSubject.next(id);
    this.currentViewSubject.next('details');
    // navigate using router so URL updates
    this.router.navigate(['/hotel', id]);
  }

  navigateToSearch(): void {
    this.currentViewSubject.next('search');
    this.router.navigate(['/search']);
  }

  navigateToDashboard(): void {
    this.currentViewSubject.next('dashboard');
    this.router.navigate(['/dashboard']);
  }

  /**
   * Basic helper to get a hotel by id from the in-memory list.
   */
  getHotelById(id: number): Hotel | undefined {
    return this.hotelsSubject.value.find((h) => h.id === id);
  }

  /**
   * Update a hotel in the in-memory state (used by details editing flows).
   */
  updateHotel(updated: Hotel): void {
    const updatedList = this.hotelsSubject.value.map((h) => (h.id === updated.id ? { ...h, ...updated } : h));
    this.hotelsSubject.next(updatedList);
    // keep filtered list in sync
    this.filteredHotelsSubject.next(
      this.filteredHotelsSubject.value.map((h) => (h.id === updated.id ? { ...h, ...updated } : h))
    );
  }

  /**
   * Simulates a booking by decrementing available rooms.
   */
  bookRoom(hotelId: number): void {
    const updated = this.hotelsSubject.value.map((h) =>
      h.id === hotelId && h.availableRooms > 0 ? { ...h, availableRooms: h.availableRooms - 1 } : h
    );
    this.hotelsSubject.next(updated);
  }
}
