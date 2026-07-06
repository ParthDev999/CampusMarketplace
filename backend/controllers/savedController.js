const User = require("../models/User");
const Post = require("../models/Post");

// Save Post
exports.savePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user._id);

    if (user.savedPosts.includes(postId)) {
      return res.status(400).json({
        success: false,
        message: "Post already saved",
      });
    }

    user.savedPosts.push(postId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Post saved successfully",
      savedPosts: user.savedPosts,
    });
  } catch (error) {
    console.error("Save post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save post",
    });
  }
};

// Unsave Post
exports.unsavePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const user = await User.findById(req.user._id);

    user.savedPosts = user.savedPosts.filter(
      (id) => id.toString() !== postId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Post removed from saved posts",
      savedPosts: user.savedPosts,
    });
  } catch (error) {
    console.error("Unsave post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to unsave post",
    });
  }
};

// Get Saved Posts
exports.getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "savedPosts",
      populate: {
        path: "owner",
        select: "name collegeId",
      },
    });

    return res.status(200).json({
      success: true,
      count: user.savedPosts.length,
      savedPosts: user.savedPosts,
    });
  } catch (error) {
    console.error("Get saved posts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved posts",
    });
  }
};