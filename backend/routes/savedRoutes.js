const express = require("express");

const {
  savePost,
  unsavePost,
  getSavedPosts,
} = require("../controllers/savedController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:postId", protect, savePost);

router.delete("/:postId", protect, unsavePost);

router.get("/", protect, getSavedPosts);

module.exports = router;