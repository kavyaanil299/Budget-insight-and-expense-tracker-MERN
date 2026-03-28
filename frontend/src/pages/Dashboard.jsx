import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import TransactionList from "../components/TransactionList";
import IncomeExpenseChart from "../components/IncomeExpenseChart";

export default function Dashboard() {
  const [tx, setTx] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");
  const [insight, setInsight] = useState("");

  const [month, setMonth] = useState("");
  const [view, setView] = useState("monthly");
  const [budget, setBudget] = useState(0);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ FETCH
  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTx(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ ADD / UPDATE
  const add = async (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Fill all fields");
      return;
    }

    try {
      let res;

      if (editId) {
        // UPDATE
        res = await API.put(`/transactions/${editId}`, {
          title,
          amount: Number(amount),
          type,
          category,
        });

        setTx(tx.map((t) => (t._id === editId ? res.data : t)));
        alert("Updated ✅");
        setEditId(null);
      } else {
        // ADD
        res = await API.post("/transactions", {
          title,
          amount: Number(amount),
          type,
          category,
        });

        setTx([res.data, ...tx]);
        alert("Added ✅");
      }

      setTitle("");
      setAmount("");
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // ✅ DELETE
  const remove = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setTx(tx.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ EDIT
  const edit = (t) => {
    setTitle(t.title);
    setAmount(t.amount);
    setCategory(t.category);
    setType(t.type);
    setEditId(t._id);
  };

  // ✅ AI
  const getAI = async () => {
    try {
      const res = await API.post("/ai", { transactions: tx });
      setInsight(res.data.message);
    } catch (err) {
      console.log(err);
      alert("AI Error ❌");
    }
  };

  // ✅ CSV EXPORT
  const exportCSV = () => {
    const rows = [["Title", "Amount", "Type", "Category", "Date"]];

    tx.forEach((t) => {
      rows.push([
        t.title,
        t.amount,
        t.type,
        t.category,
        new Date(t.createdAt).toLocaleDateString(),
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    link.click();
  };

  // ✅ FILTER
  const filteredTx = tx.filter((t) => {
    const date = new Date(t.createdAt);

    if (view === "monthly" && month) {
      return date.getMonth() + 1 === Number(month);
    }

    return true;
  });

  // ✅ CALCULATIONS
  const income = filteredTx
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = filteredTx
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Dashboard</h2>

      {/* TOGGLE */}
      <div className="mb-3">
        <button
          className={`btn me-2 ${
            view === "monthly" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("monthly")}
        >
          Monthly
        </button>

        <button
          className={`btn ${
            view === "yearly" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("yearly")}
        >
          Yearly
        </button>
      </div>

      {/* BUDGET */}
      <div className="card p-3 mb-4 shadow">
        <h5>Set Budget</h5>
        <input
          type="number"
          className="form-control mb-2"
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        <h6>
          Budget: ₹{budget} | Remaining: ₹{budget - expense}
        </h6>
      </div>

      {/* SUMMARY */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-success text-white p-3">
            Income ₹{income}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white p-3">
            Expense ₹{expense}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-primary text-white p-3">
            Balance ₹{balance}
          </div>
        </div>
      </div>

      {/* ✅ FORM FIXED */}
      <form onSubmit={add} className="row g-2 mb-4">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Salary</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-success w-100">
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* MONTH FILTER */}
      {view === "monthly" && (
        <select
          className="form-select mb-3"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      )}

      {/* LIST */}
      <TransactionList
        transactions={filteredTx}
        remove={remove}
        edit={edit}
      />

      {/* CHART */}
      <IncomeExpenseChart transactions={filteredTx} />

      {/* BUTTONS */}
      <div className="mt-3">
        <button className="btn btn-info me-2" onClick={getAI}>
          Get AI Insight
        </button>

        <button className="btn btn-success me-2" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      {/* AI RESULT */}
      {insight && (
        <div className="alert alert-warning mt-3">
          {insight}
        </div>
      )}
    </div>
  );
}