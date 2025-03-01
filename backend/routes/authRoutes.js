const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token });
  } catch (err) {
      res.status(500).json({ msg: "Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token });
  } catch (err) {
      res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;