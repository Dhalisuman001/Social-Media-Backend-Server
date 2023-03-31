const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const FetchFollowersCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  validId(userId);

  try {
    const profile = await User.findById(userId).populate("Followers");
    if (profile.followers.length > 0) res.json(profile.Followers);
    else res.send("No followers yet");
  } catch (error) {
    res.status(404);
    throw new Error("Followers do not exist");
  }
});

module.exports = FetchFollowersCtrl;
