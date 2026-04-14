import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          💰 SmartSpend
        </Link>

        <div>
          <Link className="btn btn-light me-2" to="/">
            Home
          </Link>

          {token ? (
            <>
              <Link className="btn btn-warning me-2" to="/about">
                About
              </Link>
              <Link className="btn btn-warning me-2" to="/dashboard">
                Dashboard
              </Link>
              <Link className="btn btn-dark me-2" to="/admin">
                Admin
              </Link>
              <Link className="btn btn-info me-2" to="/reports">
                Reports
              </Link>
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}