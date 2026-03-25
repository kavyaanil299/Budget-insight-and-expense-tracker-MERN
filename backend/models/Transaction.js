import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  amount: Number,
  type: String,
  category: String
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);