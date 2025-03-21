import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '../reuse-component/popup/popup.component';
import { UserdetailComponent } from '../reuse-component/userdetail/userdetail.component';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IStudio, IArea } from 'src/app/Model/Studio';
import { MasterService } from 'src/app/service/master.service';
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

  constructor(
    private service: MasterService,
    private dialog: MatDialog,
    private bookingService: BookingService
  ) {
    this.fetchBookingInformation();
  }

  fetchBookingInformation() {
    this.bookingService.fetchBookingStudioInformation().subscribe((res) => {
      this.bookingList = res.data;

      console.log(this.bookingList);

      this.dataSource = new MatTableDataSource<any>(this.bookingList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }
}
