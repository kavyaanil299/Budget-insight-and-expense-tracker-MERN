import Transaction from "../models/Transaction.js";

export const getAllTransactions = async (req, res) => {
  try {
    const data = await Transaction.find()
      .populate("userId", "email") 
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.log("ADMIN ERROR:", err.message);
    res.status(500).json({ msg: "Error fetching admin data" });
  }
};