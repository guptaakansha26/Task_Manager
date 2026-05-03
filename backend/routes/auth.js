const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    
    const hashed = await bcrypt.hash(password, 10);

    
    const usersCount = await User.countDocuments();
    const role = usersCount === 0 ? "admin" : "member";

    const user = new User({
      name,
      email,
      password: hashed,
      role
    });

    await user.save();

    res.json({ message: "User registered", role });
  } catch (err) {
    res.status(500).json("Registration error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      "secretkey"
    );

    res.json({
      token,
      role: user.role 
    });
  } catch (err) {
    res.status(500).json("Login error");
  }
});

module.exports = router;