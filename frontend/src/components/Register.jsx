import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div style={{ padding: "20px", border: "1px solid gray", width: "300px" }}>
        <h2>Register</h2>

        <input
          placeholder="Name"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleRegister} style={{ width: "100%" }}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;