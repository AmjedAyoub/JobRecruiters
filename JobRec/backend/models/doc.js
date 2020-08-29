const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  url: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  jobs: [{ type: String }]
});

module.exports = mongoose.model("Doc", postSchema);
