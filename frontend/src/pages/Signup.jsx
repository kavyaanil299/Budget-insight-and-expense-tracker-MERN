import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

function Signup() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !email || !password){
      alert("All fields required");
      return;
    }

    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password
      });

      alert(res.data.msg || "Signup successful ✅");
      navigate("/login");

    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data);

      alert(err.response?.data?.msg || "Signup failed ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{width:"350px"}}>

        <h3 className="text-center mb-3">Signup</h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100">
            Signup
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;