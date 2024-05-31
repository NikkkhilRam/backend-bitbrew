const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const userRoutes = require("./routes/userRoutes");
const tagRouter = require("./routes/tagRoutes");
const blogRouter = require("./routes/blogRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/blogs", blogRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
