import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

function Reports() {
  const [tx, setTx] = useState([]);

  useEffect(() => {
    API.get("/transactions")
      .then(res => setTx(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Reports</h2>

      <div className="card p-3 shadow">

        {tx.length === 0 ? (
          <p className="text-muted">No data available</p>
        ) : (
          tx.map((t) => (
            <div
              key={t._id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <span>{t.title}</span>
              <span className="fw-bold text-danger">
                ₹{t.amount}
              </span>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Reports;