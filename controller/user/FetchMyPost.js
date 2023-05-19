const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const FetchMyPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  validId(id);

  try {
    const profile = await User.findById(id).populate("Post");
    const AllId = profile?.Post?.map((post) => post._id).reverse();
    res.json(AllId);
  } catch (error) {
    res.status(404);
    throw new Error("Profile does not exist");
  }
});

module.exports = FetchMyPost;
