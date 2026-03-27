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
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ],
      },
      {
        headers: {
         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message =
      response.data.choices?.[0]?.message?.content ||
      "No insight available";

    res.json({ message });

  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "AI error" });
  }
};