const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const validId = require("../../utils/isValid");

const DeletePostCtrl = expressAsyncHandler(async (req, res) => {

    const id = req.user._id;
    const PostId = req.body.id;

    validId(PostId);

    const post = await Post.findById(PostId);

    if (!post) throw new Error("Post not found!");
    
    if (post.author.toString() === id.toString()) {
        try {
            const deletePost = await Post.findByIdAndDelete(PostId);
            res.json({ message: "Post is deleted", deletedPost: deletePost });
        } catch (error) {
            res.json(error);
        }
    }

    else throw new Error("You can't delete anyone's post!");



});

module.exports = DeletePostCtrl;