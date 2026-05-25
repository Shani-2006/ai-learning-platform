import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import CategoryCard from "../components/CategoryCard";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      alert("Failed to load categories");
    }
  };

  const handleDeleteCategory = async (categoryId, e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this category?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="categories-page">
      <div className="page-icons">📚 💡 ✨ 📖 ⭐ 🌱</div>

      <header className="categories-header">
        <div>
          <h1>Welcome, {user?.name || "Student"} 👋</h1>
          <p>Select a topic and start learning with AI.</p>
        </div>

        <div className="categories-actions">
          <Link to="/history">My History</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="categories-grid">
        {categories.map((category) => (
          <div className="category-wrapper" key={category._id}>
            <CategoryCard
              category={category}
              onClick={() => navigate(`/category/${category._id}`)}
            />

            {isAdmin && (
              <>
                <button
                  className="edit-category-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/categories/${category._id}/edit`);
                  }}
                >
                  ✏️
                </button>

                <button
                  className="delete-category-btn"
                  onClick={(e) => handleDeleteCategory(category._id, e)}
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        ))}

        {isAdmin && (
          <div
            className="category-card add-category-card"
            onClick={() => navigate("/admin/categories/add")}
          >
            <div className="category-icon">＋</div>
            <h3>Add Category</h3>
            <p>Create a new learning category</p>
            <button>Add</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Categories;