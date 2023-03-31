const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: [true, "Comment is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamp: true,
  }
);

// Populate who replies to the comment
ReplySchema.virtual("Replyers", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});

// Reply Likers
ReplySchema.virtual("ReplyLikers", {
    ref: "User",
    localField: "likedBy",
    foreignField: "_id",
})

const Reply = mongoose.model("Reply", ReplySchema);
module.exports = Reply;
