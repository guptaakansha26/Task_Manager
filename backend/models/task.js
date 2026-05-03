const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  assignedTo: String,
  projectId: String,
  dueDate: Date,
  status: { type: String, default: 'todo' }
});

module.exports = mongoose.model('Task', taskSchema);