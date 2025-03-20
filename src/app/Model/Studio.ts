export interface ICoordinates {
  Latitude: number;
  Longitude: number;
}

export interface IArea {
  Area: string;
}

export interface ILocation {
  City?: string;
  Area: string;
  Address?: string;
  Coordinates?: ICoordinates;
}

export interface IContact {
  Phone: string;
  Email: string;
}

export interface IAvailability {
  Open: string;
  Close: string;
}

export interface IStudio {
  Id: number;
  Name: string;
  Type: string;
  Location: ILocation;
  Contact: IContact;
  Amenities: string[];
  Description: string;
  PricePerHour: number;
  Currency: string;
  Availability: IAvailability;
  Rating: number;
  Images: string[];
}
