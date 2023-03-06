const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
const validId = require("../../utils/isValid");

const CommentLikeCtrl = expressAsyncHandler(async (req, res) => {
    const id = req.user._id;
    const CommentId = req.body.id;

    validId(CommentId);

    const comment = await Comment.findById(CommentId);

    if (!comment) throw new Error("Comment does not exist!");

    const isLiked = comment?.likedBy?.find((e) => e.toString() === id.toString());

    if (isLiked) {
        const comment_data = await Comment.findByIdAndUpdate(
            CommentId,
            {
                $pull: { likedBy: id },
                $inc: { likes: -1 },
            },
            {
                new: true,
            }
        );
        res.json(comment_data);
    } else {
        //is not liked
        const comment_data = await Comment.findByIdAndUpdate(
            CommentId,
            {
                $push: { likedBy: id },
                $inc: { likes: 1 },
            },
            {
                new: true,
            }
        );
        res.json(comment_data);
    }
});

module.exports = CommentLikeCtrl;
