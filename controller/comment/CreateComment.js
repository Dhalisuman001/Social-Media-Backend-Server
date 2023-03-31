const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
const validId = require("../../utils/isValid");

exports.CreateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const user = req.user._id;

  const { postId, description } = req?.body;

  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});
