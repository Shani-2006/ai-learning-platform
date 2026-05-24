import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.get(`/prompts/history/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setHistory(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load history");
    }
  };

  return (
    <div>
      <h1>My Learning History</h1>

      <Link to="/dashboard">Back to Dashboard</Link>

      {history.length === 0 ? (
        <p>No lessons yet.</p>
      ) : (
        history.map((item) => (
          <div key={item._id}>
            <h3>{item.prompt}</h3>
            <p>
              Category: {item.categoryId?.name} | SubCategory:{" "}
              {item.subCategoryId?.name}
            </p>
            <p>{item.response}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default History;