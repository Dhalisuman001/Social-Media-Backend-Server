const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/postModel");
const validId = require("../../utils/isValid");

const PostLikeCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  const PostId = req.body.id;

  validId(PostId);

  const post = await Post.findById(PostId);

  if (!post) throw new Error("Post does not exist!");

  const isLiked = post?.likedBy?.find((e) => e.toString() === id.toString());

  if (isLiked) {
    const post_data = await Post.findByIdAndUpdate(
      PostId,
      {
        $pull: { likedBy: id },
        $inc: { likes: -1 },
      },
      {
        new: true,
      }
    );
    res.json(post_data);
  } else {
    //is not liked
    const post_data = await Post.findByIdAndUpdate(
      PostId,
      {
        $push: { likedBy: id },
        $inc: { likes: 1 },
      },
      {
        new: true,
      }
    );
    res.json(post_data);
  }
});

module.exports = PostLikeCtrl;
