import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <div>
          <h1>👩‍💼 Admin Dashboard</h1>
          <p>Manage users, categories, and learning activity.</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="admin-dashboard-grid">
        <Link to="/admin/users" className="admin-card">
          <div className="admin-card-icon">👥</div>
          <h2>Users</h2>
          <p>View all users and open each user's learning history.</p>
        </Link>

        <Link to="/dashboard" className="admin-card">
          <div className="admin-card-icon">📚</div>
          <h2>Categories</h2>
          <p>View learning categories and add new categories.</p>
        </Link>

        <Link to="/history" className="admin-card">
          <div className="admin-card-icon">🧠</div>
          <h2>Learning History</h2>
          <p>Review generated lessons and AI learning activity.</p>
        </Link>
      </main>
    </div>
  );
}

export default AdminDashboard;