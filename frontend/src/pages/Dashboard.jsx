import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function Dashboard() {
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
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    try {
      const res = await api.get("/categories/subcategories");
      const filtered = res.data.filter(
  (sub) => sub.categoryId._id === categoryId
);
      setSubCategories(filtered);
    } catch (err) {
      console.log(err);
    }
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
  console.log("PROMPT ERROR:", err);
  console.log("RESPONSE:", err.response?.data);
  alert("Failed to get AI response");
}
  };

  return (
    <div>
      <h1>AI Learning Dashboard</h1>
      <Link to="/history">View My History</Link>
      <select onChange={handleCategoryChange}>
        <option>Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSelectedSubCategory(e.target.value)}>
        <option>Select SubCategory</option>
        {subCategories.map((sub) => (
          <option key={sub._id} value={sub._id}>
            {sub.name}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Ask AI something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleSubmitPrompt}>
        Submit Prompt
      </button>

      {response && (
        <div>
          <h2>AI Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;