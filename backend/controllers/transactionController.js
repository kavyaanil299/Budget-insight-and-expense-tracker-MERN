import Transaction from "../models/Transaction.js";

// ✅ ADD TRANSACTION
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

      // ✅ FIXED
      userId: req.user.id,
      userEmail: req.user.email,
      paymentId: "PAY" + Date.now(),
    });

    res.status(201).json(t);
  } catch (err) {
    console.log("ADD ERROR:", err.message);
    res.status(500).json({ msg: "Error adding transaction" });
  }
};

// ✅ GET USER TRANSACTIONS
export const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.log("FETCH ERROR:", err.message);
    res.status(500).json({ msg: "Error fetching transactions" });
  }
};

// ✅ DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err.message);
    res.status(500).json({ msg: "Delete failed" });
  }
};

// ✅ UPDATE TRANSACTION
export const updateTransaction = async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;

    if (!title || !amount || !type) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const updated = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        title,
        amount,
        type,
        category,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("UPDATE ERROR:", err.message);
    res.status(500).json({ msg: "Update failed" });
  }
};