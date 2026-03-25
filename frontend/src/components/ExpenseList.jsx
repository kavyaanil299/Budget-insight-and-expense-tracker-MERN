function ExpenseList({ expenses = [] }) {
  return (
    <div className="card shadow p-3 mt-4">
      <h5 className="mb-3">Expense List</h5>

      {expenses.length === 0 ? (
        <p className="text-muted">No expenses yet</p>
      ) : (
        <ul className="list-group">
          {expenses.map((e) => (
            <li
              key={e.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{e.title}</strong>
                <span className="ms-2 text-muted">
                  ({e.category})
                </span>
              </div>

              <span className="text-danger fw-bold">
                ₹{e.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
