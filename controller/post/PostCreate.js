const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const validId = require("../../utils/isValid");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const PostCreateCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  validId(id);

  const localpath = req.files?.map(({ filename }) => {
    return `public/images/post/${filename}`;
  });

  const uploadImg = [];
  for (let i = 0; i < localpath.length; i++) {
    console.log(localpath[i]);
    const { url } = await cloudinaryUploadImg(localpath[i]);
    uploadImg.push(url);
  }

  const condition = req.body?.description || uploadImg;

  if (!condition) throw new Error("No content found");
  try {
    const post = await Post.create({
      ...req.body,
      image: uploadImg,
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
    if (uploadImg) {
      localpath.forEach((element) => {
        fs.unlinkSync(element);
      });
    }
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = PostCreateCtrl;
