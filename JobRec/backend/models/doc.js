const mongoose = require("mongoose");
const { type } = require("os");

const postSchema = mongoose.Schema({
  url: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: [String],
  jobs: [Number]
});

module.exports = mongoose.model("Doc", postSchema);
