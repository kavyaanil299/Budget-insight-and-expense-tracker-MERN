export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light text-center">
      <div>
        <h1 className="display-4 fw-bold text-primary">
          SmartSpend 💰
        </h1>

        <p className="lead mt-3">
          Track expenses, manage income, and analyze your spending easily.
        </p>

        <div className="mt-4">
          <a href="/login" className="btn btn-primary me-3 px-4">
            Login
          </a>

          <a href="/signup" className="btn btn-outline-primary px-4">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}