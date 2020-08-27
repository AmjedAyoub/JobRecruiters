const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { type } = require("os");

const postSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  doc: { type: mongoose.Schema.Types.ObjectId, ref: "Doc", required: false },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Candidate", postSchema);
