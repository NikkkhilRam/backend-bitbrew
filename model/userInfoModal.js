const mongoose = require("mongoose");

const userInfoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    required: true, // It's good practice to ensure required fields
  },
  email: {
    type: String,
    required: true, // It's good practice to ensure required fields
  },
  location: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  brandColor: {
    type: String,
    default: "#000000", // Default to black color
  },
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
