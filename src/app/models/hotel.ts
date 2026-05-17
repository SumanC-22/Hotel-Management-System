export interface Hotel {

  id: number;

  name: string;

  provider: string;

  street: string;

  state: string;

  country: string;

  pincode: string;

  email: string;

  phone: string;

  shortName: string;

  hotelType: string;

  currency: string;

  location: string;

  image?: string;

  latitude: number;

  longitude: number;

  lastUsed: string;

  confirmedBookings: number;

  onRequestBookings: number;

  nextBooking: string;

  complaints: number;

  totalComplaints: number;

  amountToPay: number;
}