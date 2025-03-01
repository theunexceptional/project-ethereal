const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  achievements: { type: [String], default: [] }, // Track unlocked achievements
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
