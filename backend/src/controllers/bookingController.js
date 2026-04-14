const crypto = require("crypto");

const Booking = require("../models/Booking");
const { razorpay, EVENT_PRICE } = require("../config/razorpay");

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

const createOrder = async (req, res) => {
  try {
    const { fullName, email, phone, college, branch, year } = req.body;

    if (!fullName || !email || !phone || !college || !branch || !year) {
      return res.status(400).json({
        message:
          "fullName, email, phone, college, branch, and year are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    const amountInPaise = EVENT_PRICE * 100;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `booking_${Date.now()}`,
    });

    const booking = await Booking.create({
      user: req.user._id,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      college: college.trim(),
      branch: branch.trim(),
      year: String(year).trim(),
      amount: EVENT_PRICE,
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    return res.status(201).json({
      message: "Order created successfully",
      bookingId: booking._id,
      amount: EVENT_PRICE,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      req.body;

    if (
      !bookingId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        message:
          "bookingId, razorpayOrderId, razorpayPaymentId, and razorpaySignature are required",
      });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.razorpayOrderId !== razorpayOrderId) {
      booking.status = "failed";
      booking.razorpayPaymentId = razorpayPaymentId;
      booking.razorpaySignature = razorpaySignature;
      await booking.save();

      return res.status(400).json({ message: "Order ID mismatch" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      booking.status = "failed";
      booking.razorpayPaymentId = razorpayPaymentId;
      booking.razorpaySignature = razorpaySignature;
      await booking.save();

      return res.status(400).json({ message: "Payment verification failed" });
    }

    booking.status = "paid";
    booking.razorpayPaymentId = razorpayPaymentId;
    booking.razorpaySignature = razorpaySignature;
    await booking.save();

    return res.status(200).json({
      message: "Payment verified successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("-__v")
      .populate("user", "name email");

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getMyBookings,
};
