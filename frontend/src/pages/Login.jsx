import { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.token) {
        // SAVE TOKEN
        localStorage.setItem("token", res.data.token);

        // FORCE RELOAD (IMPORTANT)
        window.location.href = "/dashboard";
      } else {
        alert("Login failed ");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Login failed ");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handle}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}