const express = require("express");

const { reportPost } = require("../controllers/reportController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:postId", protect, reportPost);

module.exports = router;