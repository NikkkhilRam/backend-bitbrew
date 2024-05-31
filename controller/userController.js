const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");

const createUserController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.status(201).json({
      username,
      email,
      token,
      bio: user.bio,
      branding: user.branding,
      location: user.location,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email/password" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, email, username: user.username });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const fetchUserByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      console.error(error.message);
      return res.status(403).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const fetchUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.find({ username: username });

    if (!user) {
      console.error(error.message);
      return res.status(403).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const updateUserDetails = async (req, res) => {
  const { bio, location, branding } = req.body;

  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (branding) user.branding = branding;

    await user.save();

    res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createUserController,
  loginUserController,
  fetchUserByUserId,
  updateUserDetails,
  fetchUserByUsername,
};
