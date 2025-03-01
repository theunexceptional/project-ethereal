const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true }, // ✅ Fix: Store username too
    name: { type: String, required: true },
    description: { type: String, required: true },
    unlockedAt: { type: Date, default: Date.now }
});

const Achievement = mongoose.model("Achievement", AchievementSchema);
module.exports = Achievement;
