const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { equipment, startDate, endDate, totalPrice } = req.body;
    const newBooking = new Booking({
      user: req.user.id,
      equipment,
      startDate,
      endDate,
      totalPrice
    });
    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('equipment');
    res.json(bookings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
