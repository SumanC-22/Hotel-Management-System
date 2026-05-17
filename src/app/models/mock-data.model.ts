export interface BookingRecord {
  bookingId: number;
  hotelId: number;
  guestName: string;
  roomType: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  bookedAt: string;
}

export interface ComplaintRecord {
  complaintId: number;
  hotelId: number;
  category: string;
  description: string;
  status: string;
  raisedDate: string;
  resolvedDate: string | null;
}

export interface FinanceRecord {
  hotelId: number;
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  currency: string;
}

export interface CoordinateRecord {
  hotelId: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface MonthlyRevenueMetric {
  month: string;
  revenue: number;
}

export interface CityMetric {
  city: string;
  hotels: number;
}

export interface DashboardMetrics {
  totalHotels: number;
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalBookings: number;
  openComplaints: number;
  averageRating: number;
  topCities: CityMetric[];
  monthlyRevenue: MonthlyRevenueMetric[];
  generatedAt: string;
}
