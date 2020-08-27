const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  url: { type: String, required: true },
  dateAdded: { type: Date, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
});

module.exports = mongoose.model("Doc", postSchema);
