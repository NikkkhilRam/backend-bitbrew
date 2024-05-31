const express = require("express");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      const user = await User.findById(decoded.user.id).select("-password");

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { protectRoute };
