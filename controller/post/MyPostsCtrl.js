const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");

const MyPostsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;

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

module.exports = MyPostsCtrl;
