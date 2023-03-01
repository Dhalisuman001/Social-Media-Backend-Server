const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");

const FetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

module.exports = FetchPostsCtrl;