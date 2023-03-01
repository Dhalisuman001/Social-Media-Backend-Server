const mongoose = require("mongoose");

const StorySchema = mongoose.Schema(
    {
        description: {
            type: String,
        },

        image: {
            type: String,
            required: [true, "Please provide the image"],
        },

        storyTime: {
            type: Date,
        },

        category: {
            type: String,
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

        author: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
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
const Story = mongoose.model("Story", StorySchema);
module.exports = Story;
