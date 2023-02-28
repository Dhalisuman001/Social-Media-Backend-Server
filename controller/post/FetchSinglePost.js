const expressAsyncHandler = require("express-async-handler")
const Post = require("../../model/post/PostModel")
const validId = require("../../utils/isValid")

exports.FetchPostCtrl = expressAsyncHandler(async(req, res) => {
    const id = req.params.id;

    validId(id)

    try {
        const post = await Post.findById(id).populate("Comments")
        res.json(post)
    } catch (error) {
        res.status(500)
        res.json(error)
    }
})