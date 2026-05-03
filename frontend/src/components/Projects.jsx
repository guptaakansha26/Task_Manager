import React, { useEffect, useState } from "react";
import API from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");

  
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching projects: " + (err.response?.data?.error || err.message));
    }
  };

  
  const createProject = async () => {
    if (!name) return alert("Project name required");

    try {
      await API.post("/projects", {
        name,
        members: members ? members.split(",") : []
      });

      setName("");
      setMembers("");
      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("Error creating project: " + (err.response?.data?.error || err.message));
    }
  };

 
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await API.delete(`/projects/${id}`);
      alert("Project deleted");
      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("Error deleting project: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Projects</h1>
          <p className="text-gray-600">Manage and organize your projects</p>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-blue-500">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Member IDs (comma separated)"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
            />

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={createProject}
            >
              + Add Project
            </button>
          </div>
        </div>

        {}
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-600 text-lg">No projects yet. Create your first project!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-blue-400 relative group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-800 flex-1">{p.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    #{projects.indexOf(p) + 1}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  <strong>Members:</strong> 
                  {p.members && p.members.length > 0
                    ? " " + p.members.join(", ")
                    : " No members assigned"}
                </p>

                <p className="text-xs text-gray-500 mb-4">
                  Created by: <strong>{p.createdBy || "Unknown"}</strong>
                </p>

                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 mt-4"
                  onClick={() => deleteProject(p._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;