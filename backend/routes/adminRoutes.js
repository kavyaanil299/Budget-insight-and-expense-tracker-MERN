import express from "express";
import { getAllTransactions } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ ONLY ADMIN CAN ACCESS
router.get("/transactions", protect, adminOnly, getAllTransactions);

export default router;