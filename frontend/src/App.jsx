import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Register from "./components/Register";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;