import express from "express";
import { addBus, getBuses, getBusById, updateBus, deleteBus } from "../controllers/busController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, adminOnly, addBus);
router.post("/", protect, adminOnly, addBus);
router.get("/", getBuses);
router.get("/:id", protect, getBusById);
router.put("/:id", protect, adminOnly, updateBus);
router.delete("/:id", protect, adminOnly, deleteBus);

export default router;
