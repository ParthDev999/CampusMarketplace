const Report = require("../models/Report");
const Post = require("../models/Post");

// Report a Post
exports.reportPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Report reason is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Optional: prevent user from reporting same post again
    const alreadyReported = await Report.findOne({
      postId,
      reportedBy: req.user._id,
    });

    if (alreadyReported) {
      return res.status(400).json({
        success: false,
        message: "You have already reported this post",
      });
    }

    const report = await Report.create({
      postId,
      reportedBy: req.user._id,
      reason,
    });

    return res.status(201).json({
      success: true,
      message: "Post reported successfully",
      report,
    });
  } catch (error) {
    console.error("Report post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to report post",
    });
  }
};