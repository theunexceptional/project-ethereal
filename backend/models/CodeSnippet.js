const mongoose = require("mongoose");

const CodeSnippetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    html: { type: String, default: "" },
    css: { type: String, default: "" },
    js: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("CodeSnippet", CodeSnippetSchema);
