const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");

const FetchAllPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const page = req.params.page;
    const posts = await Post.find();
    const AllId = posts?.map((post) => post._id).reverse();
    if (page > 0) {
      res.json(AllId.slice(0, page * 10));
    } else {
      res.json(AllId);
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = FetchAllPostsCtrl;
