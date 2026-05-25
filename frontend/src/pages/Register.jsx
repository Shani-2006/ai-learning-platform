import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d+$/.test(formData.phone)) {
  alert("Phone number must contain digits only");
  return;
}

if (formData.phone.length != 10) {
  alert("Phone number must be 10 digits long.");
  return;
}
    try {
      await api.post("/users/register", formData);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="floating-icons">📚 💡 ✨ 📖 ⭐ 🌱</div>

      <div className="register-books-left">
        <div className="book blue"></div>
        <div className="book pink"></div>
        <div className="book yellow"></div>
        <div className="pencils">✏️ ✏️</div>
      </div>

      <div className="register-books-right">
        <div className="book purple"></div>
        <div className="book orange"></div>
        <div className="plant">🌿</div>
        <div className="cup">☕</div>
      </div>

      <div className="register-card">
        <div className="register-logo">🧠📖</div>
        <h1>Create Account</h1>
        <p className="register-subtitle">Start your AI learning journey</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="👤  Full name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="📱  Phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
         />

          <input
            type="password"
            name="password"
            placeholder="🔒  Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;