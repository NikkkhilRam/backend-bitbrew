const express = require("express");
const {
  createUserController,
  loginUserController,
  fetchUserByUserId,
  updateUserDetails,
  fetchUserByUsername,
} = require("../controller/userController");
const { validateData } = require("../middleware/validationMiddleware");
const { userRegistrationSchema } = require("../schemas/userSchema");
const { protectRoute } = require("../middleware/protectRoute");

const userRouter = express.Router();

userRouter.post("/", createUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/", protectRoute, fetchUserByUserId);
userRouter.put("/", protectRoute, updateUserDetails);
userRouter.get("/profile/:username", fetchUserByUsername)

module.exports = userRouter;
