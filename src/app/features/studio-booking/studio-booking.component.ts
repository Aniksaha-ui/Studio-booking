import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IStudio, ILocation, IArea } from 'src/app/core/interfaces/IStudio';
import { StudiobookingService } from 'src/app/core/service/studiobooking.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-studio-booking',
  templateUrl: './studio-booking.component.html',
  styleUrls: ['./studio-booking.component.css'],
})
export class StudioBookingComponent {
  studioList: IStudio[] = [];
  areaControl: FormControl = new FormControl();
  areaList: any[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'type',
    'city',
    'area',
    'price',
    'rating',
  ];
  dataSource = new MatTableDataSource<IStudio>(this.studioList);

  constructor(private studioBookingService: StudiobookingService) {}

  ngOnInit(): void {
    this.fetchStudioData();
  }

  private fetchStudioData(): void {
    this.studioBookingService.getStudioData().subscribe({
      next: (response) => {
        this.studioList = response.Studios;
        this.studioList.map((studio) => {
          this.areaList.push(studio.Location.Area);
        });
        this.dataSource = new MatTableDataSource(this.studioList);

        console.log(this.studioList);
        console.log(this.areaList);
      },
      error: (err) => {
        console.error('Error fetching studio data:', err);
      },
    });
  }
}
