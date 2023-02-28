const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const User = require("../../model/user/UserModel");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const fs = require("fs");
const validId = require("../../utils/isValid");

const PostCreateCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  validId(id);

  const localpath = `public/images/post/${req?.file?.filename}`;
  const uploadImg = await cloudinaryUploadImg(localpath);
  const condition = req.body?.description || uploadImg?.url;

  if (!condition) throw new Error("No content found");
  try {
    const post = await Post.create({
      ...req.body,
      image: uploadImg?.url,
      author: id,
    });

    //update post count
    await User.findByIdAndUpdate(
      id,
      {
        $inc: { postCount: 1 },
      },
      {
        new: true,
      }
    );

    // console.log(req.user);
    // remove uploaded images
    if (uploadImg?.url) {
      fs.unlinkSync(localpath);
    }
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = PostCreateCtrl;
