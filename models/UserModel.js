const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  keys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Key" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
