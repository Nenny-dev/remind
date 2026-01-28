const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email exists" });

    const bcrypt = require("bcryptjs");

    const hashedPassword = await bcrypt.hash(passwoard, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ 
        message: "User created", 
        userId: user._id,
        name: user.name
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials"});
    }

    res.json({ 
        message: "Login successful", userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;