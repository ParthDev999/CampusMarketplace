const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      enum: [
        "Books",
        "Electronics",
        "Hostel Items",
        "Cycles",
        "Lost",
        "Found",
        "Others",
      ],
      required: true,
    },

    type: {
      type: String,
      enum: ["Sell", "Lost", "Found"],
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    contactInfo: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);