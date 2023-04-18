const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const validId = require("../../utils/isValid");

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  const PostId = req.body.id;

  validId(PostId);

  const post = await Post.findById(PostId);

  if (!post) throw new Error("Post does not exist!");
  try {
    const post = await Post.findByIdAndUpdate(
      PostId,
      {
        ...req.body,
        author: id,
      },
      { new: true }
    )
      .populate("author")
      .populate("LikedBy")
      .populate("Comments");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = updatePostCtrl;
