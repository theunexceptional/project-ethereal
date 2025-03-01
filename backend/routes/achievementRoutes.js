const express = require("express");
const Achievement = require("../models/Achievement");
const User = require("../models/user");

const router = express.Router();

// ✅ Unlock an achievement (using username instead of userId)
router.post("/unlock", async (req, res) => {
    try {
        const { username, achievementName } = req.body;
        console.log("🔍 Received Request - username:", username, "achievementName:", achievementName);

        if (!username || !achievementName) {
            console.log("❌ Missing data");
            return res.status(400).json({ error: "Missing username or achievementName" });
        }

        // ✅ Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Check if achievement already exists
        const existingAchievement = await Achievement.findOne({ userId: user._id, name: achievementName });
        if (existingAchievement) {
            console.log("⚠️ Achievement already unlocked");
            return res.status(400).json({ error: "Achievement already unlocked" });
        }

        // ✅ Unlock new achievement
        const newAchievement = new Achievement({
            userId: user._id,
            name: achievementName,
            description: `Unlocked achievement: ${achievementName}`,
        });
        await newAchievement.save();
        console.log("✅ Achievement unlocked successfully");

        res.json({ message: "Achievement unlocked!" });

    } catch (err) {
        console.error("🔥 Error unlocking achievement:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// ✅ Get achievements by username
router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params;
        console.log("🔍 Fetching achievements for user:", username);

        // ✅ Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Fetch achievements using user._id
        const achievements = await Achievement.find({ userId: user._id });
        res.json(achievements);

    } catch (err) {
        console.error("🔥 Error fetching achievements:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

module.exports = router;
