const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      type,
      image,
      location,
      contactInfo,
    } = req.body;

    if (!title || !description || !category || !type || !location || !contactInfo) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const post = await Post.create({
      title,
      description,
      price,
      category,
      type,
      image,
      location,
      contactInfo,
      owner: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

// Get All Posts with Search and Filter
exports.getAllPosts = async (req, res) => {
  try {
    const { search, category, type, location } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const posts = await Post.find(query)
      .populate("owner", "name collegeId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get all posts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

// Get Single Post by ID
exports.getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate("owner", "name collegeId");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Get single post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
  }
};

// Get Logged-in User's Posts
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user._id })
      .populate("owner", "name collegeId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get my posts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your posts",
    });
  }
};


// Update Post - Only Owner
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own post",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};

// Delete Post - Only Owner
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own post",
      });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};