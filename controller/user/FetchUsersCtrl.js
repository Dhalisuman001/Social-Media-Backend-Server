const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");

const FetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});
module.exports = FetchUsersCtrl;
