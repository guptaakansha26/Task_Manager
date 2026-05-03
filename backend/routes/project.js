const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Project = require("../models/project");


router.post("/", auth, async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      createdBy: req.user.id,
      members: req.body.members || []
    });

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;