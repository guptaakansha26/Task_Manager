import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {}
      <div style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "30px" }}>Task Manager</h2>

        <p><Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link></p>
        <p><Link to="/projects" style={{ color: "white" }}>Projects</Link></p>
        <p><Link to="/tasks" style={{ color: "white" }}>Tasks</Link></p>

        <button
          style={{
            marginTop: "50px",
            padding: "8px",
            width: "100%",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {}
      <div style={{
        flex: 1,
        padding: "30px",
        background: "#f8fafc"
      }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;