const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tag: { type: String, required: true, unique: true },
});


const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag
