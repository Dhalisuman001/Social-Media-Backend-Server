const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const FetchFollowingCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  validId(userId);

  try {
    const profile = await User.findById(userId).populate("Following");
    if (profile.following.length > 0) res.json(profile.Following);
    else res.send("Not following anyone yet.");
  } catch (error) {
    res.status(404);
    throw new Error("Following do not exist");
  }
});

module.exports = FetchFollowingCtrl;
