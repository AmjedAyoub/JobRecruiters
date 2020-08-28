const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  url: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Doc", postSchema);
