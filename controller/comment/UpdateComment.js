const expressAsyncHandler = require("express-async-handler")
const Comment = require("../../model/comment/CommentModel")
const validId = require("../../utils/isValid")

exports.UpdateCommentCtrl = expressAsyncHandler(async(req, res) => {
    const user = req.user;
    const { commentId, description } = req.body;

    validId(commentId)

    const comment = await Comment.findById(commentId)
    res.json(comment)

    if(!comment) throw new Error("Comment doesn't exist")

    if(user.id.toString() === comment.user.toString()) {
        try {
            const update = await Comment.findByIdAndUpdate(
                commentId,
                {
                    description,
                },
                {
                    new: true,
                }
            )
            res.json(update)
        } catch (error) {
            res.json(error)
        }
    } else {
        throw new Error("You don't have permission to modify other's comments")
    }
})