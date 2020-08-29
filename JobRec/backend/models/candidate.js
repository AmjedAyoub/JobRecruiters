const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { type } = require("os");

const postSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  resume: { type: String },
  jobs: [{ type: String }]
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Candidate", postSchema);
