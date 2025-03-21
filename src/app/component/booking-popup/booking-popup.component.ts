import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { BookingService } from 'src/app/service/booking-service.service';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  styleUrls: ['./booking-popup.component.css'],
})
export class BookingPopupComponent implements OnInit {
  selectedStudioInformation: any;
  myform: FormGroup;
  timeSlots: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<BookingPopupComponent>,
    private fb: FormBuilder,
    private service: MasterService,
    private bookingService: BookingService
  ) {
    this.myform = this.fb.group({
      id: [''],
      name: [''],
      customer_name: [''],
      email: [''],
      phone: [''],
      date: [new Date()],
      time: [''],
      status: [true],
    });

    this.generateTimeSlots();
  }

  ngOnInit(): void {
    this.selectedStudioInformation = this.data;
    if (this.selectedStudioInformation && this.selectedStudioInformation.Name) {
      this.setModaldata();
    }
  }

  setModaldata() {
    this.myform.patchValue({
      id: this.selectedStudioInformation?.Id || '',
      name: this.selectedStudioInformation?.Name || '',
      customer_name: '',
      email: '',
      phone: '',
      status: true,
      date: this.selectedStudioInformation?.date
        ? new Date(this.selectedStudioInformation.date)
        : new Date(),
      time: this.selectedStudioInformation?.time
        ? this.selectedStudioInformation.time
        : '',
    });
  }

  generateTimeSlots() {
    for (let i = 1; i <= 23; i++) {
      this.timeSlots.push(`${i}:00`);
    }
  }

  closeModal() {
    this.ref.close('Closed using function');
  }

  checkAvailability(slotInfo: any): any {
    let check = 1;
    const bookingList = localStorage.getItem('bookingData');
    const bookingInfo = bookingList ? JSON.parse(bookingList) : [];
    bookingInfo.map((book: any) => {
      if (
        book.id === slotInfo.id &&
        moment(book.date).format('YYYY-MM-DD') ==
          moment(slotInfo.date).format('YYYY-MM-DD') &&
        book.time == slotInfo.time
      ) {
        check = 0;
      } else {
        check = 1;
      }
    });

    return check;
  }

  validateTimeSlot(time: string) {
    if (
      time >= this.selectedStudioInformation.Availability.Open &&
      time <= this.selectedStudioInformation.Availability.Close
    ) {
      return 1;
    }
    return 0;
  }

  StudioBooking() {
    if (this.myform.valid) {
      let validTimeSlot: number = this.validateTimeSlot(this.myform.value.time);
      let checkAvailability = this.checkAvailability(this.myform.value);

      if (!validTimeSlot) {
        alert('Time Slot not available');
        return;
      }

      if (!checkAvailability) {
        alert('Already booked this slot, try another slot.');
        return;
      }

      this.bookingService.bookingStudio(this.myform.value).subscribe((res) => {
        if (res.status == 200) {
          alert(res.message);
          this.closeModal();
        }
      });
    }
  }
}
