export interface IBookingResponse {
  status: number;
  message: string;
}

export interface IBooking {
  id: number;
  name: string;
  customer_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: boolean;
}
