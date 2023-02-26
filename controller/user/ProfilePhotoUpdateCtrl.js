const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const cloudinaryUploadImg = require("../../utils/Cloudinary");

const ProfilePhotoUpdateCtrl = expressAsyncHandler(async (req, res) => {
  //get the user
  const id = req.user._id;
  console.log(id);

  ////get the path to img
  const localpath = `public/images/profile/${req.file.filename}`;
  //   upload to cloudinary
  const uploadImg = await cloudinaryUploadImg(localpath);
  const user = await User.findByIdAndUpdate(
    id,
    {
      profilePhoto: uploadImg.url,
    },
    {
      new: true,
    }
  );
  console.log(uploadImg);
  //remove the save images
  fs.unlinkSync(localpath);
  res.json({
    localpath,
    user,
  });
});

module.exports = ProfilePhotoUpdateCtrl;
