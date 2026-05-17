// Converted from original TypeScript `hotel-data.ts` to plain JS for backend use

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const cities = [
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, pin: "400001" },
  { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, pin: "110001" },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, pin: "560001" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, pin: "600001" },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, pin: "500001" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, pin: "700001" },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, pin: "411001" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, pin: "380001" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, pin: "302001" },
  { name: "Goa", state: "Goa", lat: 15.2993, lng: 74.124, pin: "403001" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, pin: "682001" },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, pin: "313001" },
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, pin: "171001" },
  { name: "Darjeeling", state: "West Bengal", lat: 27.036, lng: 88.2627, pin: "734101" },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, pin: "570001" },
];

const hotelNames = [
  "Taj", "Oberoi", "ITC Grand", "Leela", "Marriott", "Hyatt", "Hilton",
  "Radisson", "Taj Vivanta", "Novotel", "Sheraton", "Westin", "Four Seasons",
  "Ritz-Carlton", "InterContinental", "Sofitel", "JW Marriott", "Park Hyatt",
  "Grand Hyatt", "Crowne Plaza", "Holiday Inn", "Fairmont", "Shangri-La",
  "Mandarin Oriental", "St. Regis", "W Hotel", "Conrad", "Pullman",
  "Swissotel", "Renaissance"
];

const hotelSuffixes = [
  "Palace", "Resort", "Continental", "Imperial", "Royal", "Grand",
  "Heritage", "Fortune", "Gateway", "Exotica", "Retreat", "Crown",
  "Towers", "Central", "Empire", "Prestige", "Elite", "Premier",
  "Classic", "Plaza"
];

const providers = [
  "Taj Hotels", "Oberoi Group", "ITC Hotels", "Leela Palaces",
  "Marriott International", "Hyatt Hotels", "Hilton Worldwide",
  "Radisson Hotel Group", "Accor Hotels", "IHG Hotels",
  "Four Seasons", "Starwood Hotels", "Wyndham Hotels"
];

const hotelTypes = ["Luxury", "Premium", "Business", "Resort", "Boutique", "Heritage", "Economy"];
const currencies = ["INR", "USD", "EUR", "GBP"];
const streets = [
  "Marine Drive", "MG Road", "Brigade Road", "Park Street", "Connaught Place",
  "Linking Road", "T Nagar", "Bandra Worli Sea Link", "Fateh Sagar Lake Road",
  "Janpath", "Ashram Road", "Mount Road", "Cubbon Road", "Church Street",
  "Residency Road", "Sansad Marg", "Tilak Road", "Station Road", "Lake Road",
  "Beach Road"
];

const amenitiesList = [
  "Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant",
  "Bar", "Room Service", "Parking", "Airport Shuttle", "Business Center",
  "Conference Room", "Laundry", "Concierge", "Valet Parking", "Kids Club",
  "Tennis Court", "Golf Course", "Beach Access", "Rooftop Terrace", "Yoga Studio"
];

function generateHotels() {
  const rng = seededRandom(42);
  const hotels = [];

  for (let i = 1; i <= 200; i++) {
    const city = cities[Math.floor(rng() * cities.length)];
    const hotelName = hotelNames[Math.floor(rng() * hotelNames.length)];
    const suffix = hotelSuffixes[Math.floor(rng() * hotelSuffixes.length)];
    const provider = providers[Math.floor(rng() * providers.length)];
    const hotelType = hotelTypes[Math.floor(rng() * hotelTypes.length)];
    const currency = currencies[Math.floor(rng() * currencies.length)];
    const street = streets[Math.floor(rng() * streets.length)];

    const latOffset = (rng() - 0.5) * 0.1;
    const lngOffset = (rng() - 0.5) * 0.1;

    const confirmedBookings = Math.floor(rng() * 150) + 10;
    const onRequestBookings = Math.floor(rng() * 40) + 1;
    const openComplaints = Math.floor(rng() * 10);
    const totalComplaints = openComplaints + Math.floor(rng() * 30);
    const totalAmount = Math.floor(rng() * 500000) + 50000;

    const monthlyBookings = Array.from({ length: 12 }, () => Math.floor(rng() * 50) + 5);

    const numAmenities = Math.floor(rng() * 8) + 4;
    const shuffledAmenities = [...amenitiesList].sort(() => rng() - 0.5);
    const amenities = shuffledAmenities.slice(0, numAmenities);

    const rating = Math.round((rng() * 2 + 3) * 10) / 10;

    const lastUsedMonth = Math.floor(rng() * 3) + 3;
    const lastUsedDay = Math.floor(rng() * 28) + 1;
    const nextBookingMonth = Math.floor(rng() * 3) + 5;
    const nextBookingDay = Math.floor(rng() * 28) + 1;

    const descriptions = [
      `Experience luxury and comfort at ${hotelName} ${suffix}, located in the heart of ${city.name}. This ${hotelType.toLowerCase()} hotel offers world-class amenities and exceptional service, making it the perfect destination for both business and leisure travelers.`,
      `Nestled in the vibrant city of ${city.name}, ${hotelName} ${suffix} stands as a beacon of ${hotelType.toLowerCase()} hospitality. With stunning views and impeccable service, every stay becomes a memorable experience.`,
      `${hotelName} ${suffix} in ${city.name} combines modern elegance with traditional charm. Our ${hotelType.toLowerCase()} property offers a serene retreat with top-notch facilities and personalized service.`,
    ];

    hotels.push({
      id: i,
      name: `${hotelName} ${suffix}`,
      provider,
      street,
      state: city.state,
      country: "India",
      pincode: city.pin,
      email: `${hotelName.toLowerCase().replace(/[^a-z0-9]/g, "")}${i}@example.com`,
      phone: `+91-${Math.floor(rng() * 9000000000 + 1000000000)}`,
      hotelType,
      currency,
      location: city.name,
      latitude: Math.round((city.lat + latOffset) * 10000) / 10000,
      longitude: Math.round((city.lng + lngOffset) * 10000) / 10000,
      lastUsed: `2026-${String(lastUsedMonth).padStart(2, "0")}-${String(lastUsedDay).padStart(2, "0")}`,
      confirmedBookings,
      onRequestBookings,
      nextBookingDate: `2026-${String(nextBookingMonth).padStart(2, "0")}-${String(nextBookingDay).padStart(2, "0")}`,
      openComplaints,
      totalComplaints,
      totalAmount,
      imageUrl: `https://picsum.photos/seed/hotel${i}/400/250`,
      monthlyBookings,
      rating,
      amenities,
      description: descriptions[Math.floor(rng() * descriptions.length)],
    });
  }

  return hotels;
}

let _hotels = null;

function getHotels() {
  if (!_hotels) {
    _hotels = generateHotels();
  }
  return _hotels;
}

function getHotelById(id) {
  return getHotels().find((h) => h.id === id);
}

module.exports = { getHotels, getHotelById };
