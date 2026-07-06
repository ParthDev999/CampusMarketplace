const User = require("../models/User");
const Post = require("../models/Post");
const Report = require("../models/Report");

// Get All Users - Admin Only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// Block User - Admin Only
exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin user cannot be blocked",
      });
    }

    user.isBlocked = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User blocked successfully",
    });
  } catch (error) {
    console.error("Block user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to block user",
    });
  }
};

// Unblock User - Admin Only
exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBlocked = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User unblocked successfully",
    });
  } catch (error) {
    console.error("Unblock user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to unblock user",
    });
  }
};

// Get All Posts - Admin Only
exports.getAllPostsAdmin = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("owner", "name collegeId")
        .sort({ createdAt: -1 });
  
      return res.status(200).json({
        success: true,
        count: posts.length,
        posts,
      });
    } catch (error) {
      console.error("Admin get all posts error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to fetch posts",
      });
    }
  };
  
  // Delete Any Post - Admin Only
  exports.deleteAnyPost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      await Post.findByIdAndDelete(id);
  
      // Optional cleanup: delete reports related to this post
      await Report.deleteMany({ postId: id });
  
      return res.status(200).json({
        success: true,
        message: "Post deleted successfully by admin",
      });
    } catch (error) {
      console.error("Admin delete post error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to delete post",
      });
    }
  };
  
  // Get All Reports - Admin Only
  exports.getAllReports = async (req, res) => {
    try {
      const reports = await Report.find()
        .populate("postId")
        .populate("reportedBy", "name collegeId")
        .sort({ createdAt: -1 });
  
      return res.status(200).json({
        success: true,
        count: reports.length,
        reports,
      });
    } catch (error) {
      console.error("Admin get reports error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to fetch reports",
      });
    }
  };
  
  // Update Report Status - Admin Only
  exports.updateReportStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const allowedStatus = ["Pending", "Resolved", "Rejected"];
  
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid report status",
        });
      }
  
      const report = await Report.findById(id);
  
      if (!report) {
        return res.status(404).json({
          success: false,
          message: "Report not found",
        });
      }
  
      report.status = status;
      await report.save();
  
      return res.status(200).json({
        success: true,
        message: "Report status updated successfully",
        report,
      });
    } catch (error) {
      console.error("Admin update report status error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to update report status",
      });
    }
  };