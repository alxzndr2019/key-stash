const mongoose = require("mongoose");
const { Schema } = mongoose;

const fieldSchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const Field = mongoose.model("Field", fieldSchema);
module.exports = Field;
