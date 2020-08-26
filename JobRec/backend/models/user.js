const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { type } = require("os");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  knownAs: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  created: {type: Date, require: true},
  lastActive: {type: Date, require: true},
  photoUrl: { type: String, required: true},
  interests: {type: String, require:false},
  introduction: {type: String, require:false},
  lookingFor: {type: String, require:false},
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
