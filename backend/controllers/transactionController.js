import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;

    if (!title || !amount || !type) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const t = await Transaction.create({
      title,
      amount,
      type,
      category,
      userId: req.user
    });

    res.json(t);
  } catch (err) {
    res.status(500).json({ msg: "Error adding transaction" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching transactions" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};