const express = require("express");
const {
  tagController,
  fetchTagsController,
} = require("../controller/tagController");
const tagRouter = express.Router();

tagRouter.post("/:tag", tagController);
tagRouter.get("/", fetchTagsController);

module.exports = tagRouter;
