const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");

const UserPostsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.find({ author: id })
      .populate("author")
      .populate("LikedBy")
      .populate("Comments");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

module.exports = UserPostsCtrl;
