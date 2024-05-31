const mongoose = require("mongoose");
const User = require("./userModel");
const Tag = require("../model/tagModal"); // Assuming you have a tagModel file

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    liked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // or undefined
    },

    readTime: {
      type: Number,
      default: 4,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
