const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const validId = require("../../utils/isValid");

const FetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validId(id);

  try {
    const post = await Post.findById(id)
      .populate("Comments")
      .populate("LikedBy")
      .populate("author");
    res.json(post);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

module.exports = FetchPostCtrl;
