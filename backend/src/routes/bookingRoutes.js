const express = require("express");

const {
  createOrder,
  verifyPayment,
  getMyBookings,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify-payment", protect, verifyPayment);
router.get("/my-bookings", protect, getMyBookings);

module.exports = router;
