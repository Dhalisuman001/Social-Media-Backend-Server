const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");

const FetchAllPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    const AllId = posts?.map((post) => post._id).reverse();

    res.json(AllId);
  } catch (error) {
    res.json(error);
  }
});

module.exports = FetchAllPostsCtrl;
