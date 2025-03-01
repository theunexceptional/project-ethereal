const express = require("express");
const Achievement = require("../models/Achievement");
const User = require("../models/user");

const router = express.Router();

router.post("/unlock", async (req, res) => {
    try {
        const { userId, achievementName } = req.body;
        console.log("🔍 Received Request - userId:", userId, "achievementName:", achievementName);

        if (!userId || !achievementName) {
            console.log("❌ Missing data");
            return res.status(400).json({ error: "Missing userId or achievementName" });
        }

        // ❌ Instead of `findById(userId)`, use `findOne({ username: userId })`
        const user = await User.findOne({ username: userId });
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Now use `user._id` as the proper ObjectId
        const existingAchievement = await Achievement.findOne({ userId: user._id, name: achievementName });
        if (existingAchievement) {
            console.log("⚠️ Achievement already unlocked");
            return res.status(400).json({ error: "Achievement already unlocked" });
        }

        // Unlock achievement
        const newAchievement = new Achievement({
            userId: user._id,
            name: achievementName,
            description: `Unlocked achievement: ${achievementName}`, // ✅ Fix: Default description
        });
        await newAchievement.save();
        console.log("✅ Achievement unlocked successfully");

        res.json({ message: "Achievement unlocked!" });

    } catch (err) {
        console.error("🔥 Error unlocking achievement:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// 📌 Get all achievements for a user
router.get("/:userId", async (req, res) => {
  try {
      const { userId } = req.params;
      console.log("🔍 Fetching achievements for user:", userId);

      const user = await User.findOne({ username: userId }); // ✅ Match by username
      if (!user) {
          console.log("❌ User not found");
          return res.status(404).json({ error: "User not found" });
      }

      const achievements = await Achievement.find({ userId: user._id });
      res.json(achievements);

  } catch (err) {
      console.error("🔥 Error fetching achievements:", err);
      res.status(500).json({ error: "Server error", details: err.message });
  }
});


module.exports = router;
