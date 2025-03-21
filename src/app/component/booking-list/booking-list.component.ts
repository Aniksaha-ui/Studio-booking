import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from 'src/app/service/booking-service.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent {
  dataSource: any;
  bookingList: any[] = [];
  areaControl: FormControl = new FormControl();
  displayedColumns: string[] = [
    'name',
    'type',
    'customer_name',
    'email',
    'date',
    'time',
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) {
    this.fetchBookingInformation();
  }

  fetchBookingInformation() {
    this.bookingService.fetchBookingStudioInformation().subscribe((res) => {
      this.bookingList = res.data;
      this.dataSource = new MatTableDataSource<any>(this.bookingList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }
}
