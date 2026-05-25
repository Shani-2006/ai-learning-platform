import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(res.data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="decor decor-left">
        <div className="book blue"></div>
        <div className="book pink"></div>
        <div className="book yellow"></div>
        <div className="pencils">✏️ ✏️</div>
      </div>

      <div className="decor decor-right">
        <div className="book purple"></div>
        <div className="book orange"></div>
        <div className="plant">🌿</div>
        <div className="cup">☕</div>
      </div>

      <div className="login-card">
        <div className="logo">🧠📖</div>
        <h1>AI Learning Platform</h1>
        <p className="subtitle">Learn smarter, achieve more</p>

        <h2>Welcome back!</h2>
        <p className="small-text">Please login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="phone"
            placeholder="📱  Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="🔒  Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;