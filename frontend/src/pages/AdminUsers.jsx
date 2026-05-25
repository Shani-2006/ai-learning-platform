import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./AdminUsers.css";

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const regularUsers = res.data.filter((user) => user.role !== "admin");
      setUsers(regularUsers);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-users-page">
      <header className="admin-users-header">
        <div>
          <h1>👥 Users Management</h1>
          <p>View all learners and inspect their AI learning history.</p>
        </div>

        <div className="admin-users-actions">
          <Link to="/admin">Back</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-users-grid">
        {users.map((user) => (
          <div
            key={user._id}
            className="user-card"
            onClick={() =>
              navigate(`/admin/users/${user._id}/history`)
            }
          >
            <div className="user-avatar">👤</div>
            <h3>{user.name}</h3>
            <p>{user.phone}</p>
            <button>View Learning History</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default AdminUsers;