import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { IBooking } from 'src/app/Model/Booking';
import { BookingService } from 'src/app/service/booking-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  styleUrls: ['./booking-popup.component.css'],
})
export class BookingPopupComponent implements OnInit {
  selectedStudioInformation: any;
  bookingForm: FormGroup;
  timeSlots: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<BookingPopupComponent>,
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      id: [''],
      name: [''],
      customer_name: [''],
      email: [''],
      date: [new Date()],
      time: [''],
      type: '',
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
    this.bookingForm.patchValue({
      id: this.selectedStudioInformation?.Id || '',
      name: this.selectedStudioInformation?.Name || '',
      customer_name: '',
      email: '',
      phone: '',
      type: this.selectedStudioInformation?.Type,
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

  checkAvailability(slotInfo: IBooking): number {
    let check = 1;
    const bookingList = localStorage.getItem('bookingData');
    const bookingInfo: IBooking[] = bookingList ? JSON.parse(bookingList) : [];
    bookingInfo.map((book: IBooking) => {
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
    if (this.bookingForm.valid) {
      let validTimeSlot: number = this.validateTimeSlot(
        this.bookingForm.value.time
      );
      let checkAvailability = this.checkAvailability(this.bookingForm.value);

      if (!validTimeSlot) {
        Swal.fire({
          icon: 'error',
          title: 'Time Slot Not Available!',
          text: 'The selected time slot is not available. Please choose another time.',
        });
        return;
      }

      if (!checkAvailability) {
        Swal.fire({
          icon: 'error',
          title: 'Already Booked Slot!',
          text: 'The selected time slot is not available. Please choose another time.',
        });
        return;
      }

      this.bookingService
        .bookingStudio(this.bookingForm.value)
        .subscribe((res) => {
          if (res.status == 200) {
            Swal.fire({
              icon: 'success',
              title: 'Booking successfully',
              text: 'Booking successfully',
              html: `
              <table style="width:100%; border-collapse: collapse; text-align: left;">
                <tr>
                  <th style="padding: 8px; border: 1px solid #ddd;">Field</th>
                  <th style="padding: 8px; border: 1px solid #ddd;">Details</th>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">Customer Name</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${this.bookingForm.value.customer_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">Email</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${this.bookingForm.value.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">Date</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${this.bookingForm.value.date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">Time</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${this.bookingForm.value.time}</td>
                </tr>
              </table>
            `,
            });
            this.closeModal();
          }
        });
    }
  }
}
