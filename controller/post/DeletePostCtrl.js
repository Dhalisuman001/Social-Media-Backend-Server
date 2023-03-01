const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const validId = require("../../utils/isValid");

const DeletePostCtrl = expressAsyncHandler(async (req, res) => {

    const PostId = req.body.id;

    validId(PostId);
    
    const post = await Post.findById(PostId);

    if (!post) throw new Error("Post does not exist!");

    try {
        const deletePost = await Post.findByIdAndDelete(PostId);
        res.json({ message: "Post is deleted", deletedPost: deletePost });
    } catch (error) {
        res.json(error);
    }

});

module.exports = DeletePostCtrl;