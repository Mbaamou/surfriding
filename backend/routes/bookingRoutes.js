const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, bookingController.createBooking);
router.get('/', auth, bookingController.getUserBookings);

module.exports = router;
