const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "🔐 Secure Dashboard Access!", user: req.user });
});

module.exports = router;

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
