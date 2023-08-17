const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, minlength: 5 },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  plan: { type: String, enum: ["free", "basic", "premium"], default: "free" },
  keys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Key" }],
});

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
