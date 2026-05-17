import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen, scan, delay } from 'rxjs/operators';
import { Hotel } from './hotel.model';
import { BookingRecord, ComplaintRecord, FinanceRecord, CoordinateRecord, DashboardMetrics } from './mock-data.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private basePath = 'assets/data';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.basePath}/hotels.json`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, err) => {
            if (acc >= 2) {
              throw err;
            }
            return acc + 1;
          }, 0),
          delay(1000)
        )
      ),
      catchError((error) => {
        const friendly = error?.status
          ? `Server error ${error.status}: Unable to load hotels.`
          : 'Network error: Unable to reach assets. Please check your connection.';
        console.error('Error loading hotels.json', error);
        return throwError(() => new Error(friendly));
      })
    );
  }

  getBookingData(): Observable<BookingRecord[]> {
    return this.http.get<BookingRecord[]>(`${this.basePath}/booking-data.json`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, err) => {
            if (acc >= 2) throw err;
            return acc + 1;
          }, 0),
          delay(800)
        )
      ),
      catchError((error) => {
        console.error('Error loading booking-data.json', error);
        return throwError(() => new Error('Unable to load booking data.'));
      })
    );
  }

  getComplaintData(): Observable<ComplaintRecord[]> {
    return this.http.get<ComplaintRecord[]>(`${this.basePath}/complaint-data.json`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, err) => {
            if (acc >= 2) throw err;
            return acc + 1;
          }, 0),
          delay(800)
        )
      ),
      catchError((error) => {
        console.error('Error loading complaint-data.json', error);
        return throwError(() => new Error('Unable to load complaint data.'));
      })
    );
  }

  getFinanceData(): Observable<FinanceRecord[]> {
    return this.http.get<FinanceRecord[]>(`${this.basePath}/finance-data.json`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, err) => {
            if (acc >= 1) throw err;
            return acc + 1;
          }, 0),
          delay(600)
        )
      ),
      catchError((error) => {
        console.error('Error loading finance-data.json', error);
        return throwError(() => new Error('Unable to load finance data.'));
      })
    );
  }

  getCoordinatesData(): Observable<CoordinateRecord[]> {
    return this.http.get<CoordinateRecord[]>(`${this.basePath}/coordinates-data.json`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, err) => {
            if (acc >= 1) throw err;
            return acc + 1;
          }, 0),
          delay(500)
        )
      ),
      catchError((error) => {
        console.error('Error loading coordinates-data.json', error);
        return throwError(() => new Error('Unable to load coordinates data.'));
      })
    );
  }

  getDashboardMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.basePath}/dashboard-metrics.json`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, err) => {
            if (acc >= 2) throw err;
            return acc + 1;
          }, 0),
          delay(700)
        )
      ),
      catchError((error) => {
        console.error('Error loading dashboard-metrics.json', error);
        return throwError(() => new Error('Unable to load dashboard metrics.'));
      })
    );
  }
}
