const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: [true, "Post is required"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        }
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

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;