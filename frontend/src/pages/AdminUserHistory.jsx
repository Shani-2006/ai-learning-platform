import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./AdminUserHistory.css";
import ReactMarkdown from "react-markdown";

function AdminUserHistory() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/prompts/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setHistory(res.data);
    } catch (err) {
      alert("Failed to load user history");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-history-page">
      <header className="admin-history-header">
        <div>
          <h1>🧠 User Learning History</h1>
          <p>Review this user's generated AI lessons and activity.</p>
        </div>

        <div className="admin-history-actions">
          <Link to="/admin/users">Back</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-history-layout">
        {history.length === 0 ? (
          <div className="empty-admin-history">
            <h2>No learning history found</h2>
            <p>This user hasn't generated any lessons yet.</p>
          </div>
        ) : (
          history.map((item) => (
            <div className="admin-history-card" key={item._id}>
              <div className="admin-history-card-header">
                <div>
                  <h2>{item.prompt}</h2>
                  <p>
                    {item.categoryId?.name} → {item.subCategoryId?.name}
                  </p>
                </div>

                <span>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

             <div className="admin-history-response">
              <ReactMarkdown>{item.response}</ReactMarkdown>
             </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default AdminUserHistory;