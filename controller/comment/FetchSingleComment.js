const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
const validId = require("../../utils/isValid");

exports.FetchSingleCommentCtrl = expressAsyncHandler(async (req, res) => {
  const commentId = req.params.id;

  validId(commentId);

  try {
    const comment = await Comment.findById(commentId);
    res.json(comment);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});
