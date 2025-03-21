import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private jsonUrl = 'assets/data.json';
  constructor(private http: HttpClient) {}

  saveBookingInLocalStorage(bookingData: any) {
    let existingData = localStorage.getItem('bookingData');
    let bookings = existingData ? JSON.parse(existingData) : [];

    if (!Array.isArray(bookings)) {
      bookings = [];
    }
    bookings.push({
      ...bookingData,
      date: moment(bookingData.date).format('YYYY-MM-DD'),
    });
    localStorage.setItem('bookingData', JSON.stringify(bookings));
  }

  bookingStudio(bookingData: any): Observable<any> {
    this.saveBookingInLocalStorage(bookingData);
    return of({ status: 200, message: 'Booking Successfully' });
  }

  fetchBookingStudioInformation(): Observable<any> {
    return of({ status: 200, data: localStorage.getItem('bookingData') ?? [] });
  }
}
