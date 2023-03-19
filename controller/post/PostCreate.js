const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const validId = require("../../utils/isValid");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const Post = require("../../model/post/PostModel");

const PostCreateCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;

  const localpath = req.files?.map(({ filename }) => {
    return `public/images/post/${filename}`;
  });

  const uploadImg = [];
  for (let i = 0; i < localpath?.length; i++) {
    const { url } = await cloudinaryUploadImg(localpath[i]);
    uploadImg.push(url);
  }

  const condition = req.body?.caption || uploadImg.length;

  if (!condition) throw new Error("No content found");

  // remove uploaded images
  if (uploadImg.length) {
    localpath?.forEach((element) => {
      fs.unlinkSync(element);
    });
  }

  try {
    // console.log(uploadImg);
    const post = await Post.create({
      ...req.body,
      image: uploadImg,
      author: id,
    });

    console.log(post);

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

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = PostCreateCtrl;
