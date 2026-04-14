const TransactionList = ({ transactions = [], remove, edit }) => {
  return (
    <div className="card p-3 shadow">
      <h4 className="mb-3">All Transactions</h4>

      {transactions.length === 0 ? (
        <p className="text-muted">No transactions yet</p>
      ) : (
        transactions.map((t) => (
          <div
            key={t._id}
            className="d-flex justify-content-between align-items-center border-bottom py-2"
          >
            <div>
              <strong>{t.title || "No Title"}</strong>
              <span className="ms-2 text-muted">({t.type})</span>
            </div>

            <div>
              <span className="text-danger fw-bold">
                ₹{t.amount || 0}
              </span>

              {/* EDIT BUTTON */}
              <button
                className="btn btn-sm btn-warning ms-2"
                onClick={() => edit(t)}
              >
                Edit
              </button>

              {/*  DELETE BUTTON */}
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={() => remove(t._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;