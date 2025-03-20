import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private service: MasterService
  ) {
    this.myform = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      date: [new Date()], // Default to current date
      time: [''], // Default empty
      status: [true],
    });

    // Generate time slots from 1 to 23 hours
    this.generateTimeSlots();
  }

  ngOnInit(): void {
    this.selectedStudioInformation = this.data;
    console.log(this.selectedStudioInformation, 'Popup data found');

    if (this.selectedStudioInformation && this.selectedStudioInformation.Name) {
      this.setpopupdata();
    }
  }

  setpopupdata() {
    console.log(this.selectedStudioInformation, 'Setting data');
    this.myform.patchValue({
      id: this.selectedStudioInformation?.Id || '',
      name: this.selectedStudioInformation?.Name || '',
      email: '',
      phone: '',
      status: true,
      date: this.selectedStudioInformation?.date
        ? new Date(this.selectedStudioInformation.date)
        : new Date(), // Set current date if no date found
      time: this.selectedStudioInformation?.time
        ? this.selectedStudioInformation.time
        : '', // Keep empty if no time is found
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

  StudioBooking() {
    if (this.myform.valid) {
      let validTimeSlot: number = this.validateTimeSlot(this.myform.value.time);
      if (validTimeSlot) {
      } else {
        alert('Time slot not available');
        this.closeModal();
      }

      console.log(this.myform.value, 'myform value');

      // this.service.Savecustomer(formData).subscribe(() => {
      //   this.closepopup();
      // });
    }
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
}
