import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Model/Customer';
import { PopupComponent } from '../reuse-component/popup/popup.component';
import { UserdetailComponent } from '../reuse-component/userdetail/userdetail.component';
import { Component, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IStudio, IArea } from 'src/app/Model/Studio';
import { StudioService } from 'src/app/service/studio.service';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
@Component({
  selector: 'app-studio-list',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.css'],
})
export class StudioListComponent {
  dataSource: any;
  studioList: IStudio[] = [];
  areaControl: FormControl = new FormControl();
  areaList: IArea[] = [];
  colors: string[] = ['Red', 'Blue', 'Black'];
  displayedColumns: string[] = [
    'name',
    'type',
    'city',
    'area',
    'price',
    'amenities',
    'rating',
    'action',
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private studioService: StudioService) {
    this.fetchStudioInformation();
  }

  fetchStudioInformation() {
    this.studioService.getStudioData().subscribe((res) => {
      console.log(res);

      this.studioList = res.Studios;
      this.dataSource = new MatTableDataSource<IStudio>(this.studioList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;

      this.studioList.map((studio) => {
        this.areaList.push({ Area: studio.Location.Area } as IArea);
      });
    });
  }

  Filterchange(event: any) {
    let input: any = event.target.value.toLowerCase();
    console.log(input, 'input');
    if (!input) {
      this.dataSource.data = this.studioList;
      return;
    }

    let filteredData = this.studioList.filter((studio) => {
      return studio.Location?.Area?.toLowerCase().includes(input);
    });

    this.dataSource.data = filteredData;
  }

  FilterSelectchange(input: string) {
    console.log('Filter triggered:', input);
  }

  bookingStudio(data: any) {
    console.log(data, 'data');
    this.Openpopup(data, 'Edit Customer', BookingPopupComponent);
  }

  detailcustomer(code: any) {
    this.Openpopup(code, 'Customer Detail', UserdetailComponent);
  }

  addcustomer() {
    this.Openpopup(0, 'Add Customer', PopupComponent);
  }

  Openpopup(data: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: data,
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
      this.fetchStudioInformation();
    });
  }
}
