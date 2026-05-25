import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./AddCategory.css";

function EditCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await api.get("/categories");
      const category = res.data.find((cat) => cat._id === categoryId);

      if (category) {
        setName(category.name);
      }
    } catch (err) {
      alert("Failed to load category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/categories/${categoryId}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Category updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to update category");
    }
  };

  return (
    <div className="add-category-page">
      <div className="add-category-card">
        <div className="add-category-icon">✏️</div>

        <h1>Edit Category</h1>
        <p>Update this learning category.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">Save Changes</button>
        </form>

        <Link to="/dashboard">← Back to Categories</Link>
      </div>
    </div>
  );
}

export default EditCategory;