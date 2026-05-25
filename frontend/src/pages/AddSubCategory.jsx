import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./AddSubCategory.css";

function AddSubCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/categories/subcategories", {
        name,
        categoryId
      });

      alert("SubCategory added successfully");
      navigate(`/category/${categoryId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add subcategory");
    }
  };

  return (
    <div className="add-subcategory-page">
      <div className="add-subcategory-card">
        <div className="add-subcategory-icon">🧩＋</div>

        <h1>Add New SubCategory</h1>
        <p>Create a focused learning topic inside this category.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="SubCategory name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">Add SubCategory</button>
        </form>

        <Link to={`/category/${categoryId}`}>← Back to SubCategories</Link>
      </div>
    </div>
  );
}

export default AddSubCategory;