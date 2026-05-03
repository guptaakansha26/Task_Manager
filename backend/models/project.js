const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  createdBy: String,
  members: [String] // user IDs
});

module.exports = mongoose.model("Project", projectSchema);