import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./AddSubCategory.css";

function EditSubCategory() {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const fetchSubCategory = async () => {
    try {
      const res = await api.get("/categories/subcategories");
      const subCategory = res.data.find((sub) => sub._id === subCategoryId);

      if (subCategory) {
        setName(subCategory.name);
      }
    } catch (err) {
      alert("Failed to load subcategory");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/categories/subcategories/${subCategoryId}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("SubCategory updated successfully");
      navigate(`/category/${categoryId}`);
    } catch (err) {
      alert("Failed to update subcategory");
    }
  };

  return (
    <div className="add-subcategory-page">
      <div className="add-subcategory-card">
        <div className="add-subcategory-icon">✏️</div>

        <h1>Edit SubCategory</h1>
        <p>Update this focused learning topic.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="SubCategory name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">Save Changes</button>
        </form>

        <Link to={`/category/${categoryId}`}>← Back to SubCategories</Link>
      </div>
    </div>
  );
}

export default EditSubCategory;