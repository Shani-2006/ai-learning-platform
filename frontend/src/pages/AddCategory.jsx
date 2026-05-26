import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./AddCategory.css";

function AddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

await api.post(
  "/categories",
  { name },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
      alert("Category added successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="add-category-page">
      <div className="add-category-card">
        <div className="add-category-icon">📚＋</div>

        <h1>Add New Category</h1>
        <p>Create a new learning area for StudyMate AI.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">Add Category</button>
        </form>

        <Link to="/dashboard">← Back to Categories</Link>
      </div>
    </div>
  );
}

export default AddCategory;