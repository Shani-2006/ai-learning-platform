import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");

    const res = await api.get("/categories/subcategories");

    const filtered = res.data.filter(
      (sub) => sub.categoryId._id === categoryId
    );

    setSubCategories(filtered);
  };

  const handleSubmitPrompt = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/prompts",
        {
          categoryId: selectedCategory,
          subCategoryId: selectedSubCategory,
          prompt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResponse(res.data.data.response);
    } catch (err) {
      alert("Failed to get AI response");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-bg-icons">📚 ✨ 💡 📖 ⭐ 🌱</div>

      <div className="dashboard-layout">
        <div className="dashboard-header">
          <div>
            <h1>AI Learning Dashboard</h1>
            <p>Choose a topic, ask a question, and get a personalized lesson.</p>
          </div>

          <div className="dashboard-actions">
            <Link to="/history" className="history-link">
              View History
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Create a New Lesson</h2>

          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Ask AI something you want to learn..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button onClick={handleSubmitPrompt}>Generate Lesson</button>
        </div>

        {response && (
          <div className="response-card">
            <h2>AI Response</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;