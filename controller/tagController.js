const express = require("express");
const Tag = require("../model/tagModal");

const tagController = async (req, res) => {
  const { tag } = req.params;

  try {
    // Check if the tag already exists
    const existingTag = await Tag.findOne({ tag });

    if (existingTag) {
      return res.status(403).json({ message: "Tag already exists" });
    }

    // Create and save the new tag
    const createdTag = new Tag({ tag });
    await createdTag.save();

    // Retrieve all tags and exclude _id and __v
    const tags = await Tag.find().select("-_id -__v").lean();

    res.status(201).json(tags);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const fetchTagsController = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json(tags);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { tagController, fetchTagsController };
