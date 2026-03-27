import express from "express";
import { addTransaction, getTransactions, deleteTransaction } from "../controllers/transactionController.js";
import { updateTransaction } from "../controllers/transactionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTransactions);
router.post("/", protect, addTransaction);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);
export default router;