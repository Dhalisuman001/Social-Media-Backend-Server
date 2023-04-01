const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const FetchProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;

  try {
    const profile = await User.findById(id).populate("Post");
    res.json(profile);
  } catch (error) {
    res.status(404);
    throw new Error("Profile does not exist");
  }
});

module.exports = FetchProfileCtrl;
