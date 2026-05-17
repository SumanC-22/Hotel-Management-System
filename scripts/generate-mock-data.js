const fs = require('fs');
const path = require('path');

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const cities = [
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.076, lng: 72.8777, pin: '400001' },
  { name: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025, pin: '110001' },
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, pin: '560001' },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, pin: '600001' },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.4867, pin: '500001' },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, pin: '700001' },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, pin: '411001' },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, pin: '380001' },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, pin: '302001' },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lng: 74.124, pin: '403001' },
];

const hotelNames = [
  'Taj', 'Oberoi', 'ITC', 'Leela', 'Marriott', 'Hyatt', 'Hilton', 'Radisson',
  'Novotel', 'Sheraton', 'Westin', 'Four Seasons', 'Ritz-Carlton', 'InterContinental',
  'Crowne Plaza', 'Holiday Inn', 'Fairmont', 'Sofitel', 'JW Marriott', 'W Hotel'
];

const hotelSuffixes = [
  'Palace', 'Resort', 'Grand', 'Empire', 'Plaza', 'Heritage', 'Retreat', 'Towers',
  'Garden', 'Bay', 'Suites', 'Heights', 'Vista', 'Royal', 'Hills'
];

const providers = [
  'Taj Hotels', 'Oberoi Group', 'ITC Hotels', 'Leela Palaces', 'Marriott International',
  'Hyatt Hotels', 'Hilton Worldwide', 'Radisson Hotel Group', 'Accor Hotels', 'IHG Hotels'
];

const hotelTypes = ['Luxury', 'Premium', 'Business', 'Resort', 'Boutique', 'Economy'];
const currencies = ['INR', 'USD', 'EUR'];
const tags = ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Bar', 'Airport Shuttle', 'Pet Friendly', 'Family', 'Business'];
const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Family'];
const complaintCategories = ['Housekeeping', 'Service', 'Billing', 'Food', 'Cleanliness', 'Noise'];
const statuses = ['Confirmed', 'Pending', 'Cancelled', 'Completed'];

function randomItem(list, rng) {
  return list[Math.floor(rng() * list.length)];
}

function generateHotels(count = 200) {
  const rng = seededRandom(12345);
  const hotels = [];

  for (let i = 1; i <= count; i++) {
    const city = randomItem(cities, rng);
    const brand = randomItem(hotelNames, rng);
    const suffix = randomItem(hotelSuffixes, rng);
    const provider = randomItem(providers, rng);
    const hotelType = randomItem(hotelTypes, rng);
    const currency = randomItem(currencies, rng);
    const latOffset = (rng() - 0.5) * 0.09;
    const lngOffset = (rng() - 0.5) * 0.09;

    const monthlyBookings = Array.from({ length: 12 }, () => Math.floor(rng() * 70) + 5);
    const confirmedBookings = monthlyBookings.reduce((sum, value) => sum + value, 0);
    const onRequestBookings = Math.floor(rng() * 50);
    const openComplaints = Math.floor(rng() * 15);
    const totalComplaints = openComplaints + Math.floor(rng() * 35);
    const totalAmount = Math.floor(50000 + rng() * 450000);
    const rating = Math.round((3 + rng() * 2) * 10) / 10;
    const pricePerNight = Math.round(80 + rng() * 320);
    const availableRooms = Math.floor(rng() * 40) + 5;
    const month = Math.floor(rng() * 12) + 1;
    const day = Math.floor(rng() * 28) + 1;
    const nextBookingDate = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const hotel = {
      id: i,
      name: `${brand} ${suffix}`,
      shortName: brand,
      provider,
      hotelType,
      currency,
      street: `${Math.floor(rng() * 300) + 1} ${randomItem(['Marine Drive', 'MG Road', 'Park Street', 'Brigade Road', 'Connaught Place', 'Cubbon Road'], rng)}`,
      state: city.state,
      country: 'India',
      pincode: city.pin,
      email: `${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}${i}@example.com`,
      phone: `+91-${Math.floor(rng() * 9000000000) + 1000000000}`,
      location: city.name,
      latitude: Math.round((city.lat + latOffset) * 10000) / 10000,
      longitude: Math.round((city.lng + lngOffset) * 10000) / 10000,
      rating,
      pricePerNight,
      availableRooms,
      imageUrl: `https://picsum.photos/seed/hotel${i}/400/250`,
      description: `Enjoy premium ${hotelType.toLowerCase()} hospitality at ${brand} ${suffix} in ${city.name}.`,
      tags: Array.from(new Set([randomItem(tags, rng), randomItem(tags, rng), randomItem(tags, rng)])).slice(0, 4),
      monthlyBookings,
      confirmedBookings,
      onRequestBookings,
      lastUsed: `2026-${String(Math.floor(rng() * 3) + 3).padStart(2, '0')}-${String(Math.floor(rng() * 28) + 1).padStart(2, '0')}`,
      nextBookingDate,
      nextBooking: nextBookingDate,
      openComplaints,
      totalComplaints,
      totalAmount,
    };

    hotels.push(hotel);
  }
  return hotels;
}

function generateBookingData(hotels) {
  const rng = seededRandom(4321);
  const bookings = [];
  let bookingId = 1;

  hotels.forEach((hotel) => {
    const count = Math.floor(rng() * 15) + 10;
    for (let j = 0; j < count; j++) {
      const checkIn = new Date(2026, Math.floor(rng() * 6), Math.floor(rng() * 26) + 1);
      const nights = Math.floor(rng() * 5) + 1;
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + nights);
      bookings.push({
        bookingId: bookingId++,
        hotelId: hotel.id,
        guestName: `${randomItem(['Aarav', 'Isha', 'Rohan', 'Neha', 'Karan', 'Priya', 'Ananya', 'Vikram', 'Sneha', 'Arjun'], rng)} ${randomItem(['Shah', 'Patel', 'Gupta', 'Kumar', 'Mehta', 'Roy', 'Singh', 'Jain'], rng)}`,
        roomType: randomItem(roomTypes, rng),
        status: randomItem(statuses, rng),
        checkInDate: checkIn.toISOString().split('T')[0],
        checkOutDate: checkOut.toISOString().split('T')[0],
        amount: Math.round((hotel.pricePerNight + rng() * 100) * nights),
        bookedAt: new Date(checkIn.getTime() - Math.floor(rng() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
    }
  });

  return bookings;
}

function generateComplaintData(hotels) {
  const rng = seededRandom(9876);
  const complaints = [];
  let complaintId = 1;
  const reasons = [
    'Slow service', 'Dirty room', 'Billing error', 'Noisy neighbors', 'Unfriendly staff',
    'Food quality', 'Poor housekeeping', 'Wi-Fi issues', 'Booking discrepancy', 'Maintenance problem'
  ];

  hotels.forEach((hotel) => {
    const count = Math.floor(rng() * 6);
    for (let i = 0; i < count; i++) {
      const raisedDate = new Date(2026, Math.floor(rng() * 5), Math.floor(rng() * 28) + 1);
      const resolvedDate = new Date(raisedDate);
      resolvedDate.setDate(resolvedDate.getDate() + Math.floor(rng() * 10) + 1);
      const status = rng() < 0.7 ? 'Resolved' : 'Open';
      complaints.push({
        complaintId: complaintId++,
        hotelId: hotel.id,
        category: randomItem(complaintCategories, rng),
        description: randomItem(reasons, rng),
        status,
        raisedDate: raisedDate.toISOString().split('T')[0],
        resolvedDate: status === 'Resolved' ? resolvedDate.toISOString().split('T')[0] : null,
      });
    }
  });

  return complaints;
}

function generateFinanceData(hotels) {
  const rng = seededRandom(5555);
  const finance = [];

  hotels.forEach((hotel) => {
    for (let month = 1; month <= 12; month++) {
      const revenue = Math.round((hotel.monthlyBookings[month - 1] * hotel.pricePerNight) * (1 + rng() * 0.4));
      const expenses = Math.round(revenue * (0.35 + rng() * 0.25));
      finance.push({
        hotelId: hotel.id,
        month: `${String(month).padStart(2, '0')}/2026`,
        revenue,
        expenses,
        profit: revenue - expenses,
        currency: hotel.currency,
      });
    }
  });

  return finance;
}

function generateCoordinatesData(hotels) {
  return hotels.map((hotel) => ({
    hotelId: hotel.id,
    name: hotel.name,
    location: hotel.location,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    address: `${hotel.street}, ${hotel.location}, ${hotel.state}, ${hotel.country} ${hotel.pincode}`,
  }));
}

function generateDashboardMetrics(hotels, bookings, complaints, finance) {
  const totalRevenue = finance.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = finance.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const totalBookings = bookings.length;
  const openComplaints = complaints.filter(c => c.status === 'Open').length;
  const averageRating = Math.round((hotels.reduce((sum, hotel) => sum + hotel.rating, 0) / hotels.length) * 10) / 10;
  const cities = {};

  hotels.forEach((hotel) => {
    cities[hotel.location] = (cities[hotel.location] || 0) + 1;
  });

  const topCities = Object.entries(cities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([city, count]) => ({ city, hotels: count }));

  const monthlyRevenue = Array.from({ length: 12 }, (_, idx) => ({
    month: new Date(2026, idx).toLocaleString('default', { month: 'short' }),
    revenue: finance.filter(item => item.month.startsWith(String(idx + 1).padStart(2, '0'))).reduce((sum, item) => sum + item.revenue, 0),
  }));

  return {
    totalHotels: hotels.length,
    totalRevenue,
    totalExpenses,
    totalProfit,
    totalBookings,
    openComplaints,
    averageRating,
    topCities,
    monthlyRevenue,
    generatedAt: new Date().toISOString(),
  };
}

function writeJson(filename, data) {
  const filePath = path.join(__dirname, '..', 'src', 'assets', 'data', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Written ${filePath}`);
}

function main() {
  const hotels = generateHotels(200);
  const bookingData = generateBookingData(hotels);
  const complaintData = generateComplaintData(hotels);
  const financeData = generateFinanceData(hotels);
  const coordinatesData = generateCoordinatesData(hotels);
  const dashboardMetrics = generateDashboardMetrics(hotels, bookingData, complaintData, financeData);

  writeJson('hotels.json', hotels);
  writeJson('booking-data.json', bookingData);
  writeJson('complaint-data.json', complaintData);
  writeJson('finance-data.json', financeData);
  writeJson('coordinates-data.json', coordinatesData);
  writeJson('dashboard-metrics.json', dashboardMetrics);
}

main();
