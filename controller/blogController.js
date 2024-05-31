const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/userModel");
const Blog = require("../model/blogModal");
const Tag = require("../model/tagModal");

const createBlogController = async (req, res) => {
  const { title, content, tagId } = req.body;
  try {
    const user = await User.findById(req.user);
    const tag = await Tag.findById(tagId);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if tag exists
    if (!tag) {
      return res.status(403).json({ message: "Invalid tag" });
    }

    // Check for empty title or content
    if (title === "" || content === "") {
      return res.status(403).json({ message: "Invalid Inputs" });
    }

    // Create new blog
    const blog = new Blog({
      title,
      content,
      user: user._id,
      tag: tag._id,
    });

    // Save the blog
    await blog.save();

    // Format the response
    const formattedBlog = {
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      user: user.username,
      tag: tag.tag,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };

    // Return success response with formatted blog data
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: formattedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user").sort({ updatedAt: 1 });

    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      tag: blog.tag,
      liked: blog.liked,
      readTime: blog.readTime,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      username: blog.user.username,
    }));

    return res.status(200).json({
      blogs: formattedBlogs,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchBlogsByTag = async (req, res) => {
  const { tagId } = req.params;

  // Check if tagId is provided
  if (!tagId) {
    return res.status(400).json({ message: "Tag ID is required" });
  }

  try {
    // Find the tag by ID
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Find blogs associated with the tag ID
    const blogs = await Blog.find({ tag: tagId }).populate("user", "username");

    // Format the blogs to include necessary fields
    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      tag: blog.tag,
      liked: blog.liked,
      readTime: blog.readTime,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      username: blog.user.username,
    }));

    return res.status(200).json({ blogs: formattedBlogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchBlogsById = async (req, res) => {
  const { blogId } = req.params;
  try {
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }
    let blog;
    try {
      blog = await Blog.findOne({ _id: blogId });
    } catch (error) {
      return res.status(200).json({ blogs: [] });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const fetchBlogsByUserId = async (req, res) => {
  const { username } = req.params;
  try {
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find the user by username
    const user = await User.findOne({ username: username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find blogs associated with the user and populate the user field
    const blogs = await Blog.find({ user: user._id }).populate(
      "user",
      "username"
    );

    // Format the blogs to include necessary fields
    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      tag: blog.tag,
      liked: blog.liked,
      readTime: blog.readTime,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      username: blog.user.username,
    }));

    // Return the blogs in the response
    return res.status(200).json({ blogs: formattedBlogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBlogController,
  fetchAllBlogsController,
  fetchBlogsByTag,
  fetchBlogsById,
  fetchBlogsByUserId,
};
