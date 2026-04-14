import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    type: String,
    category: String,
    paymentId: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);