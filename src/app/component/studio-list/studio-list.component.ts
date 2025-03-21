import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IStudio, IArea } from 'src/app/Model/Studio';
import { StudioService } from 'src/app/service/studio.service';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
@Component({
  selector: 'app-studio-list',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.css'],
})
export class StudioListComponent implements OnInit {
  dataSource: any;
  studioList: IStudio[] = [];
  areaControl: FormControl = new FormControl();
  areaList: IArea[] = [];
  myLocation: any = { latitude: 0, longitude: 0 };

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

  constructor(
    private dialog: MatDialog,
    private studioService: StudioService
  ) {}
  ngOnInit(): void {
    this.fetchStudioInformation();
    this.setMyLocation();
  }

  setMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = Number(position.coords.latitude);
          const longitude = Number(position.coords.longitude);
          this.myLocation = { latitude: latitude, longitude: longitude };
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  fetchStudioInformation() {
    this.studioService.getStudioData().subscribe((res) => {
      this.studioList = res.Studios;
      this.dataSource = new MatTableDataSource<IStudio>(this.studioList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;

      this.studioList.map((studio) => {
        this.areaList = Array.from(
          new Set(this.studioList.map((studio) => studio.Location.Area))
        ).map((area) => ({ Area: area } as IArea));
      });
    });
  }

  filterChange(event: any) {
    let input: any = event.target.value.toLowerCase();
    if (!input) {
      this.dataSource.data = this.studioList;
      return;
    }

    let filteredData = this.studioList.filter((studio) => {
      return studio.Location?.Area?.toLowerCase().includes(input);
    });

    this.dataSource.data = filteredData;
  }

  onAreaSelect(event: any) {
    let selectedArea: string = event.option.value.toLowerCase();
    if (!selectedArea) {
      this.dataSource.data = this.studioList;
      return;
    }

    let filteredData = this.studioList.filter((studio) => {
      return studio.Location?.Area?.toLowerCase().includes(selectedArea);
    });

    this.dataSource.data = filteredData;
  }

  // This method calculates the distance between two geographical points using the Haversine formula
  getDistance(
    userLat: number,
    userLong: number,
    shopLat: number,
    shopLong: number
  ): number {
    const toRad = (value: number) => (value * Math.PI) / 180; // Convert degrees to radians
    const redius = 6371;
    const dLat = toRad(shopLat - userLat);
    const dLon = toRad(shopLong - userLong);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLat)) *
        Math.cos(toRad(shopLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return redius * c;
  }

  rediusChange(event: any) {
    let searchRadiusValue: number = event.target.value;

    if (!searchRadiusValue || isNaN(searchRadiusValue)) {
      this.dataSource.data = this.studioList;
      return;
    }
    let filteredStudios = this.studioList.filter((studio: any) => {
      const Latitude = studio.Location?.Coordinates?.Latitude ?? 0;
      const Longitude = studio.Location?.Coordinates?.Longitude ?? 0;
      const userLatitude = Number(this.myLocation.latitude);
      const userLongitude = Number(this.myLocation.longitude);
      if (
        isNaN(userLatitude) ||
        isNaN(userLongitude) ||
        isNaN(Latitude) ||
        isNaN(Longitude)
      ) {
        console.error('Invalid coordinates');
        return false;
      }
      const distance = this.getDistance(
        userLatitude,
        userLongitude,
        Latitude,
        Longitude
      );

      return distance <= searchRadiusValue;
    });
    this.dataSource.data = filteredStudios;
  }

  bookingStudio(data: any) {
    this.OpenBookingModal(data, 'Edit Customer', BookingPopupComponent);
  }

  OpenBookingModal(data: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: data,
    });
    _popup.afterClosed().subscribe((item) => {
      this.fetchStudioInformation();
    });
  }
}
