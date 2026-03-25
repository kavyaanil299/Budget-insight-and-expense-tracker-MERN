import axios from "axios";

export const getInsights = async (req, res) => {
  try {
    const tx = req.body.transactions;

    if (!tx || tx.length === 0) {
      return res.json({ message: "No transactions to analyze." });
    }

    const totalExpense = tx
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    const prompt = `Total spending is ₹${totalExpense}. Give 1 short financial advice.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const message =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No insight available";

    res.json({ message });

  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "AI error" });
  }
};