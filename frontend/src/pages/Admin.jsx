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

      console.log("✅ ADMIN DATA:", res.data);

      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load admin data ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>

      <table className="table table-bordered mt-3">
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
                <td>{t.userId?.email || "N/A"}</td>
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
  );
}