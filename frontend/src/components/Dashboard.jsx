import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.filter(t => t.status !== "done").length;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={cardStyle}>
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>

        <div style={cardStyle}>
          <h3>Completed</h3>
          <p style={{ color: "green" }}>{completed}</p>
        </div>

        <div style={cardStyle}>
          <h3>Pending</h3>
          <p style={{ color: "red" }}>{pending}</p>
        </div>

      </div>
    </div>
  );
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

export default Dashboard;