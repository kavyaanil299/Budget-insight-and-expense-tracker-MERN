import { useState } from "react";

function ExpenseForm({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  const submit = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Please fill all fields");
      return;
    }

    addTransaction({
      title,
      amount: Number(amount),
      type,
      category,
    });

    setTitle("");
    setAmount("");
  };

  return (
    <div className="card shadow p-3 mb-4">
      <h5 className="mb-3">Add Transaction</h5>

      <form onSubmit={submit}>

        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="form-select mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {type === "expense" && (
          <select
            className="form-select mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Bills</option>
            <option>Entertainment</option>
          </select>
        )}

        <button className="btn btn-primary w-100">
          Add Transaction
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;