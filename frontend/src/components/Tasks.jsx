import React, { useEffect, useState } from "react";
import API from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [dueDate, setDueDate] = useState("");

  
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching tasks: " + (err.response?.data?.error || err.message));
    }
  };

 
  const createTask = async () => {
    if (!title) return alert("Task title required");
    
    try {
      await API.post("/tasks", {
        title,
        assignedTo: userId || "Unassigned",
        projectId: "general",
        dueDate
      });
      setTitle("");
      setUserId("");
      setDueDate("");
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Error creating task: " + (err.response?.data?.error || err.message));
    }
  };

  
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Error updating task: " + (err.response?.data?.error || err.message));
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      alert("Task deleted");
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Delete failed: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {}
      <div className="flex gap-2 mb-4">
        <input
          className="p-2 border rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          placeholder="Assign User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          className="bg-green-500 text-white px-4 rounded"
          onClick={createTask}
        >
          Add
        </button>
      </div>

      {}
      {tasks.map((t) => (
        <div
          key={t._id}
          className="bg-white p-3 shadow rounded mb-2 flex justify-between"
        >
          <div>
            <p className="font-semibold">{t.title}</p>
            <p>Status: {t.status}</p>
            <p>
              Due:{" "}
              {t.dueDate
                ? new Date(t.dueDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-2 rounded"
              onClick={() =>
                updateStatus(
                  t._id,
                  t.status === "done" ? "todo" : "done"
                )
              }
            >
              {t.status === "done" ? "Undo" : "Done"}
            </button>

            <button
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => deleteTask(t._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;