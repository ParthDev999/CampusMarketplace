const express = require("express");

const {
  getAllUsers,
  blockUser,
  unblockUser,
  getAllPostsAdmin,
  deleteAnyPost,
  getAllReports,
  updateReportStatus,
} = require("../controllers/adminController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

// User management
router.get("/users", protect, adminOnly, getAllUsers);

router.patch("/users/:id/block", protect, adminOnly, blockUser);

router.patch("/users/:id/unblock", protect, adminOnly, unblockUser);

// Post management
router.get("/posts", protect, adminOnly, getAllPostsAdmin);

router.delete("/posts/:id", protect, adminOnly, deleteAnyPost);

// Report management
router.get("/reports", protect, adminOnly, getAllReports);

router.patch("/reports/:id/status", protect, adminOnly, updateReportStatus);

module.exports = router;