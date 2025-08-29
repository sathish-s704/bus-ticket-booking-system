import express from "express";
import { setRole, ensureAdminRole, register, login, getProfile, getAllUsers, updateUser, deleteUser, forgotPassword, verifyOtp, resetPassword } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/profile", protect, getProfile);
router.post("/set-role", protect, adminOnly, setRole);
router.post("/ensure-admin-role", ensureAdminRole);

// Admin only routes
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id", protect, adminOnly, updateUser);
router.delete("/users/:id", protect, adminOnly, deleteUser);

export default router;
