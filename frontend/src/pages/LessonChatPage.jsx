import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./LessonChatPage.css";
import ReactMarkdown from "react-markdown";

function LessonChatPage() {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello! 👋 I'm StudyMate AI.
I can help you learn with clear explanations, examples, summaries, and practice questions.

What would you like to learn today?`
    }
  ]);

  useEffect(() => {
    loadTopicData();
  }, []);

  const loadTopicData = async () => {
    const categoriesRes = await api.get("/categories");
    const subCategoriesRes = await api.get("/categories/subcategories");

    setCategory(categoriesRes.data.find((cat) => cat._id === categoryId));
    setSubCategory(subCategoriesRes.data.find((sub) => sub._id === subCategoryId));
  };



  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return;

    const userMessage = prompt;
    setPrompt("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/prompts",
        { categoryId, subCategoryId, prompt: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.data.response }
      ]);
    } catch (err) {
      alert("Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="chat-page">
      <header className="chat-topbar">
        <div className="chat-icons">📚 💡 ✨ 📖 ⭐ 🌱</div>

        <div className="chat-title">
          <h1>🧠 StudyMate AI</h1>
          <p>Your AI Learning Companion ✨</p>
        </div>

        <div className="chat-buttons">
          <Link to="/history">History</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="chat-layout">
        <aside className="left-panel">
          <div className="side-card topic-card">
            <div className="topic-icon">📘</div>
            <h3>{category?.name || "Current Topic"}</h3>
            <p>{subCategory?.name || "Sub Category"}</p>
            <Link to={`/category/${categoryId}`}>← Back to Subcategories</Link>
          </div>

          <div className="side-card tip-card">
            <h3>Study Tip 💡</h3>
            <p>
              Ask focused questions like: "Explain this with examples",
              "Give me practice questions", or "Summarize this topic".
            </p>
          </div>
        </aside>

        <section className="chat-center">
          <div className="messages-area">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-row ${
                  msg.sender === "user" ? "user-row" : "ai-row"
                }`}
              >
                <div className="avatar">
                  {msg.sender === "user" ? "👤" : "🤖"}
                </div>

                <div className={`message-bubble ${msg.sender}`}>
                  {msg.sender === "ai" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                      ) : (
                   <p>{msg.text}</p>
                     )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message-row ai-row">
                <div className="avatar">🤖</div>
                <div className="message-bubble ai loading-message">
                  <p>StudyMate AI is thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="prompt-box">
            <button className="small-icon">📎</button>

            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your question here..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />

            <button className="send-btn" onClick={handleSend} disabled={isLoading}>
              ➤
            </button>
          </div>
        </section>

        <aside className="right-panel">
          <div className="side-card">
            <h3>Lesson Topics</h3>
            <ul className="topics-list">
              <li>✅ Clear explanations</li>
              <li>✅ Examples</li>
              <li>🟣 Practice questions</li>
              <li>⚪ Summary</li>
              <li>⚪ Review</li>
            </ul>
          </div>

          <div className="side-card resources-card">
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