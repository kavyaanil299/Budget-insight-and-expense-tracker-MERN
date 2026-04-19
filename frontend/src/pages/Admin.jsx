import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await API.get("/admin/transactions");
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load admin data ❌");
    }
  };

  //  TOTAL AMOUNT
  const totalAmount = data.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mt-4">

      {/*  CARD START */}
      <div className="card shadow-lg p-4">

        {/* TITLE */}
        <h2 className="text-center mb-3">Admin Panel</h2>

        {/* SUMMARY */}
        <div className="d-flex justify-content-between mb-3">
          <h5>Total Transactions: {data.length}</h5>
          <h5>Total Amount: ₹{totalAmount}</h5>
        </div>

        {/* TABLE */}
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>User Email</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Payment ID</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((t) => (
                <tr key={t._id}>
                  <td>{t.userEmail || "N/A"}</td>
                  <td>{t.title}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.paymentId || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
      {/*  CARD END */}

    </div>
  );
}