import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { postLogin, postSingup } from "./controllers/user.js";
import {
  getBlog,
  postBlog,
  getBlogForSlug,
  patchPublishBlog,
  putBlog,
} from "./controllers/blog.js";
import JWT from "jsonwebtoken";
import Blog from "./models/Blog.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect) {
      console.log("✅ MongoDB connected successfully");
    }
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
  }
};

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

const JWTcheck = (req, res, next) => {
  req.decodedUser = null;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({
      message: "Authorization Token Missing",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECERT);
    req.decodedUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Jwt Token",
    });
  }
};

const IncreaseViewCount = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (blog) {
      blog.viewCount += 1;
      await blog.save();
    }
  } catch (error) {
    console.error("Error increasing view count:", error);
  }
  next();
};
app.post("/singup", postSingup);
app.post("/login", postLogin);
app.post("/addblogs", JWTcheck, postBlog);
app.get("/blogs", getBlog);
app.get("/blogs/:slug", IncreaseViewCount, getBlogForSlug);
app.patch("/blogs/:slug/publish", JWTcheck, patchPublishBlog);
app.put("/blogs/:slug", JWTcheck, putBlog);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
