const bcrypt = require("bcrypt");
const User = require("../models/User");
const validateCollegeId = require("../utils/validateCollegeId");
const generateToken = require("../utils/generateToken");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, collegeId, password } = req.body;

    // Check all fields
    if (!name || !collegeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, college ID and password are required",
      });
    }

    // Convert collegeId to uppercase
    const formattedCollegeId = collegeId.toUpperCase();

    // Validate college ID format
    const isValidCollegeId = validateCollegeId(formattedCollegeId);

    if (!isValidCollegeId) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID format",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      collegeId: formattedCollegeId,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this college ID",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      collegeId: formattedCollegeId,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        collegeId: user.collegeId,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { collegeId, password } = req.body;

    // Check all fields
    if (!collegeId || !password) {
      return res.status(400).json({
        success: false,
        message: "College ID and password are required",
      });
    }

    // Convert collegeId to uppercase
    const formattedCollegeId = collegeId.toUpperCase();

    // Find user by collegeId
    const user = await User.findOne({
      collegeId: formattedCollegeId,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid college ID or password",
      });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked by admin",
      });
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid college ID or password",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        collegeId: user.collegeId,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};