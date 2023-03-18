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
    hashtag: Array,

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

//Populate Comment
PostSchema.virtual("Comment", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

PostSchema.pre("save", function (next) {
  let caption = this.caption.replace(/\s/g, "");
  console.log(caption);
  let hashTagIndex = caption.indexOf("#");
  if (hashTagIndex === -1) {
    this.hashtag = undefined;
    return next();
  }
  let hashTagSplice = caption.slice(hashTagIndex);
  //let res= hashTagSplice.replace(/#/, '').split('#');

  this.hashtag = hashTagSplice.replace(/#/, "").split("#");
  next();
});

// compile
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
