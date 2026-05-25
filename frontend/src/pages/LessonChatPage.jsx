import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../api/api";
import "./LessonChatPage.css";

function LessonChatPage() {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [lesson, setLesson] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTopicData();
  }, []);

  const loadTopicData = async () => {
    const categoriesRes = await api.get("/categories");
    const subCategoriesRes = await api.get("/categories/subcategories");

    setCategory(categoriesRes.data.find((cat) => cat._id === categoryId));
    setSubCategory(subCategoriesRes.data.find((sub) => sub._id === subCategoryId));
  };

  const handleGenerateLesson = async () => {
    if (!prompt.trim() || isLoading) return;

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/prompts",
        {
          categoryId,
          subCategoryId,
          prompt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLesson(res.data.data.response);
    } catch (err) {
      alert("Failed to generate lesson");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="lesson-page">
      <header className="lesson-topbar">
        <div className="lesson-icons">📚 💡 ✨ 📖 ⭐ 🌱</div>

        <div className="lesson-title">
          <h1>🧠 StudyMate AI</h1>
          <p>Create a personalized lesson based on your selected topic</p>
        </div>

        <div className="lesson-buttons">
          <Link to="/history">History</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="lesson-layout">
        <aside className="lesson-side">
          <div className="side-card topic-card">
            <div className="topic-icon">📘</div>
            <h3>{category?.name || "Category"}</h3>
            <p>{subCategory?.name || "SubCategory"}</p>
            <Link to={`/category/${categoryId}`}>← Back to Subcategories</Link>
          </div>

          <div className="side-card">
            <h3>Study Tip 💡</h3>
            <p>
              Write what you want to understand, for example:
              “Explain with examples”, “Give me a beginner lesson”, or
              “Prepare practice questions”.
            </p>
          </div>
        </aside>

        <section className="lesson-main">
          {!lesson && (
            <div className="lesson-form-card">
              <h2>
                What would you like to learn today about{" "}
                {subCategory?.name || "this topic"}?
              </h2>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`What would you like to learn today about ${subCategory?.name || "this topic"}?`}
                disabled={isLoading}
              />

              <button onClick={handleGenerateLesson} disabled={isLoading}>
                {isLoading ? "Creating lesson..." : "Create Lesson"}
              </button>
            </div>
          )}

          {isLoading && (
            <div className="lesson-loading-card">
              <h2>StudyMate AI is creating your lesson...</h2>
              <p>Please wait a few seconds ✨</p>
            </div>
          )}

          {lesson && !isLoading && (
            <article className="lesson-article">
              <div className="lesson-article-header">
                <div>
                  <h2>{subCategory?.name} Lesson</h2>
                  <p>
                    {category?.name} → {subCategory?.name}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setLesson("");
                    setPrompt("");
                  }}
                >
                  Create Another Lesson
                </button>
              </div>

              <div className="lesson-content">
                <ReactMarkdown>{lesson}</ReactMarkdown>
              </div>
            </article>
          )}
        </section>

        <aside className="lesson-side">
          <div className="side-card">
            <h3>Lesson Actions</h3>
            <Link to="/history">View My History</Link>
            <Link to="/dashboard">Choose New Category</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default LessonChatPage;