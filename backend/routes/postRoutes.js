const express = require("express");

const {
  createPost,
  getAllPosts,
  getSinglePost,
  getMyPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);

router.get("/", getAllPosts);

router.get("/my-posts", protect, getMyPosts);

router.get("/:id", getSinglePost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

module.exports = router;