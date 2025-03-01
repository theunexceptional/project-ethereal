require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const connectDB = require("./database");
const User = require("./models/user"); // ✅ Import user model

const JWT_SECRET = process.env.JWT_SECRET || "98217737";
const PORT = process.env.PORT || 5000;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use("/api/achievements", require("./routes/achievementRoutes"));

// Connect to MongoDB
connectDB();

// Serve static files (✅ Moved after initializing `app`)
app.use(express.static(path.join(__dirname, "../public")));

// Landing page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Import API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/code", require("./routes/codeRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "All fields required" });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "User already exists or server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); // 🔍 Debugging line
    
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set Cookie
    res.cookie("token", token, { 
      httpOnly: true, 
      sameSite: "Lax", // Helps with cross-site issues
    });

    res.json({ message: "Login successful" });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected Route
app.get("/protected", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Protected data access granted", userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
