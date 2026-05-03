import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div style={{ padding: "20px", border: "1px solid gray", width: "300px" }}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} style={{ width: "100%" }}>
          Login
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;