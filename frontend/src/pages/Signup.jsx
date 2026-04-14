import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import toast from "react-hot-toast"; 

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields required ❌"); 
      return;
    }

    try {
      setLoading(true); 

      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      toast.success(res.data.msg || "Signup successful ✅"); 

      navigate("/login");

    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data);

      toast.error(err.response?.data?.msg || "Signup failed ❌"); 
    } finally {
      setLoading(false); // ✅ STOP LOADING
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>

        <h3 className="text-center mb-3">Signup</h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            disabled={loading} 
          >
            {loading ? "Signing up..." : "Signup"} 
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;