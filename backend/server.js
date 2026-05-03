const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); 


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/task-manager")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/tasks", require("./routes/task"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Use env MongoDB (Railway)
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/projects", require("./routes/project"));
// app.use("/api/tasks", require("./routes/task"));

// // ✅ Use dynamic port (Railway)
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });