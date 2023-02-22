const mongoose = require("mongoose");

// post Schema
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title"],
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    postDate: {
      type: Date,
    },

    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    views: {
      type: Number,
      default: 0,
    },

    likedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    author: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    category: {
      type: String,
    },

    isLiked: {
      type: Boolean,
      default: false,
    },

    isDisliked: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },

    timestamps: true,
  }
);

// compile
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
