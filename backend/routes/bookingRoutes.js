import express from "express";
import { 
  bookTicket, 
  getMyBookings, 
  getAllBookings, 
  getBookingById, 
  updatePaymentStatus, 
  cancelBooking,
  deleteBooking
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/book", protect, bookTicket);
router.get("/my", protect, getMyBookings);
router.get("/:bookingId", protect, getBookingById);
router.put("/:bookingId/payment", protect, updatePaymentStatus);
router.put("/:bookingId/cancel", protect, cancelBooking);

// Admin routes
router.get("/all", protect, adminOnly, getAllBookings);
router.delete("/:bookingId", protect, adminOnly, deleteBooking);

export default router;
