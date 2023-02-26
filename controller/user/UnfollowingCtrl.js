const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

// Unfollowing

const UnfollowingCtrl = expressAsyncHandler(async (req, res) => {
  const { Id } = req.body;

  validId(Id);

  const user = await User.findById(Id);
  const myId = req.user._id;

  if (!user) throw new Error("User not found!");

  const isFollowing = await user?.followers?.find(
    (u) => u.toString() === myId.toString()
  );

  if (!isFollowing) throw new Error("You do not follow this user");

  await User.findByIdAndUpdate(
    Id,
    {
      $pull: { followers: myId },
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    myId,
    {
      $pull: { following: Id },
    },
    { new: true }
  );

  res.json({
    message: "Unfollowed Successfully",
    My_Id: myId,
    Followind_Id: Id,
  });
});

module.exports = UnfollowingCtrl