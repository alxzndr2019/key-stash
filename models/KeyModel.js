const mongoose = require("mongoose");
const { Schema } = mongoose;

const keySchema = new Schema({
  account: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  fields: [{ type: mongoose.Schema.Types.ObjectId, ref: "Field" }],
});

const Key = mongoose.model("Key", keySchema);
module.exports = Key;
