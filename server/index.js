const express = require('express');
const cors = require('cors');
const { getHotels, getHotelById } = require('./hotel-data');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get('/api/hotels', (req, res) => {
  try {
    const search = (req.query.search || '').toString();
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = parseInt(req.query.pageSize || '20', 10);

    let hotels = getHotels();

    if (search.trim()) {
      const term = search.toLowerCase();
      hotels = hotels.filter(
        (h) =>
          h.name.toLowerCase().includes(term) ||
          h.location.toLowerCase().includes(term) ||
          h.hotelType.toLowerCase().includes(term) ||
          h.provider.toLowerCase().includes(term) ||
          h.state.toLowerCase().includes(term)
      );
    }

    const total = hotels.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const paginatedHotels = hotels.slice(start, start + pageSize);

    res.json({ hotels: paginatedHotels, total, page, pageSize, totalPages });
  } catch (err) {
    console.error('Error in /api/hotels', err);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

app.get('/api/hotels/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const hotel = getHotelById(id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    console.error('Error in /api/hotels/:id', err);
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
});

app.listen(PORT, () => {
  console.log(`Hotel API server running on http://localhost:${PORT}`);
});
