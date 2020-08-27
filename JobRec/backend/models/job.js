const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  title: { type: String, required: true },
  position: { type: Number, required: true },
  status: { type: String, required: true },
  dateUpdated: { type: Date, required: true },
  manager: { type: String, required: true },
  team: { type: String, required: true },
  createdBy: { type: String, required: true},
  createdAt: {type: Date, require: true},
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }]
});


module.exports = mongoose.model("Job", userSchema);
