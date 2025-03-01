const express = require("express");
const CodeSnippet = require("../models/CodeSnippet");
const authMiddleware = require("../middleware/protectedRoutes");
const router = express.Router();

// Save Code
router.post("/save", authMiddleware, async (req, res) => {
    const { html, css, js } = req.body;

    try {
        const newCode = new CodeSnippet({
            user: req.user.userId,
            html,
            css,
            js,
        });

        await newCode.save();
        res.json({ msg: "Code saved successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// Get User Code
router.get("/fetch", authMiddleware, async (req, res) => {
    try {
        const userCode = await CodeSnippet.findOne({ user: req.user.userId }).sort({ createdAt: -1 });
        res.json(userCode || {});
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
