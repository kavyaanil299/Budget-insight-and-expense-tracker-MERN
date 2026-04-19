import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";

function App() {

  //  direct check (NO useState)
  const isAuth = localStorage.getItem("token");

  return (
    <div className="d-flex flex-column min-vh-100">

      <Navbar />

      <div className="flex-grow-1 container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              isAuth ? <Dashboard /> : <Navigate to="/login" />
            }
          />

          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;