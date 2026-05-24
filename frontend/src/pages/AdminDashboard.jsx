import { useEffect, useState } from "react";
import api from "../api/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchPrompts();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPrompts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/prompts/admin/all?page=1&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPrompts(res.data.prompts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      {users.map((user) => (
        <div key={user._id}>
          <p>
            {user.name} - {user.phone} ({user.role})
          </p>
        </div>
      ))}

      <hr />

      <h2>All Learning Prompts</h2>
      {prompts.map((item) => (
        <div key={item._id}>
          <h3>{item.prompt}</h3>
          <p>User: {item.userId?.name}</p>
          <p>{item.response}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;