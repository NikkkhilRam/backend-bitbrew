// In blogRouter.js

const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const {
  createBlogController,
  fetchAllBlogsController,
  fetchBlogsByTag,
  fetchBlogsById,
  fetchBlogsByUserId, // Import the new controller function
} = require("../controller/blogController");
const blogRouter = express.Router();

blogRouter.post("/", protectRoute, createBlogController);
blogRouter.get("/", fetchAllBlogsController);
blogRouter.post("/tags/:tagId", fetchBlogsByTag);
blogRouter.get("/:blogId", fetchBlogsById);
blogRouter.get("/user/:username", fetchBlogsByUserId);

module.exports = blogRouter;
