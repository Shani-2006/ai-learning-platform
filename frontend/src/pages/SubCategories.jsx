import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import SubCategoryCard from "../components/SubCategoryCard";
import "./SubCategories.css";

function SubCategories() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  const fetchData = async () => {
    try {
      const categoriesRes = await api.get("/categories");
      const selectedCategory = categoriesRes.data.find(
        (cat) => cat._id === categoryId
      );

      setCategory(selectedCategory);

      const subRes = await api.get("/categories/subcategories");

      const filtered = subRes.data.filter((sub) => {
        const subCategoryCategoryId =
          typeof sub.categoryId === "object"
            ? sub.categoryId._id
            : sub.categoryId;

        return subCategoryCategoryId === categoryId;
      });

      setSubCategories(filtered);
    } catch (err) {
      alert("Failed to load sub-categories");
    }
  };

  const handleDeleteSubCategory = async (subCategoryId, e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this subcategory?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/categories/subcategories/${subCategoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSubCategories(
        subCategories.filter((sub) => sub._id !== subCategoryId)
      );
    } catch (err) {
      alert("Failed to delete subcategory");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="subcategories-page">
      <div className="page-icons">📘 ✨ 🧠 📖 ⭐ 🌱</div>

      <header className="subcategories-header">
        <div>
          <h1>{category ? category.name : "Sub Categories"}</h1>
          <p>Choose a focused topic and continue to your AI lesson.</p>
        </div>

        <div className="subcategories-actions">
          <Link to="/dashboard">Back</Link>
          <Link to="/history">My History</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="subcategories-grid">
        {subCategories.map((subCategory) => (
          <div className="subcategory-wrapper" key={subCategory._id}>
            <SubCategoryCard
              subCategory={subCategory}
              onClick={() =>
                navigate(`/learn/${categoryId}/${subCategory._id}`)
              }
            />

            {isAdmin && (
              <>
                <button
                  className="edit-subcategory-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/admin/categories/${categoryId}/subcategories/${subCategory._id}/edit`
                    );
                  }}
                >
                  ✏️
                </button>

                <button
                  className="delete-subcategory-btn"
                  onClick={(e) => handleDeleteSubCategory(subCategory._id, e)}
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        ))}

        {isAdmin && (
          <div
            className="subcategory-card add-subcategory-card"
            onClick={() =>
              navigate(`/admin/categories/${categoryId}/subcategories/add`)
            }
          >
            <div className="subcategory-icon">＋</div>
            <h3>Add SubCategory</h3>
            <p>Create a new focused learning topic</p>
            <button>Add</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default SubCategories;