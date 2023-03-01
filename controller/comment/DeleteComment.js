const expressAsyncHandler = require("express-async-handler")
const Post = require("../../model/post/PostModel")
const Comment = require("../../model/comment/CommentModel")
const validId = require("../../utils/isValid")

exports.DeleteCommentCtrl = expressAsyncHandler(async(req, res) => {
    const user = req.user;
    const { commentId } = req.body;
    
    validId(commentId)
    
    const comment = await Comment.findById(commentId)
    
    if(!comment) throw new Error("Comment doesn't exist")

    const post = await Post.findById(comment.post)

    if(user.id.toString() === comment.user.toString() || user.id.toString() === post.author.toString()) {
        try {
            const commentDelete = await Comment.findByIdAndDelete(commentId)
            req.json(commentId)
        } catch (error) {
            res.json(error)
        }
    }

})