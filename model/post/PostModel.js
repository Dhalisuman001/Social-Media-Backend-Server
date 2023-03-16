const mongoose = require("mongoose");

// post Schema
const PostSchema = mongoose.Schema(
  {
    description: {
      type: String,
    },

    image: {
      type: [],
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
    // Comment: {
    //   type: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Comment",
    //     },
    //   ],
    // },

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

// PostSchema.virtual("Comment", {
//   ref: "Comment",
//   foreignField: "post",
//   localField: "_id",
// });

// compile
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
