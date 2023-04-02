const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");

const PostCommentsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ post: id }).populate("user");
    res.json(comments)
  } catch (error) {
    res.json(error);
  }
});

module.exports = PostCommentsCtrl;
