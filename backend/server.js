import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://budget-insight-and-expense-tracker-ecru.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully ");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));