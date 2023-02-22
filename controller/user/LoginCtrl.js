const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");

const LoginCtrl = expressAsyncHandler(async (req, res) => {
  const isUser = await User.findOne({ email: req.body.email });

  if (!isUser) {
    throw new Error("Email does not exist!");
  }

  if (await isUser.CheckPassword(req.body.password)) {
    res.json(isUser);
  } else {
    res.status(404);
    throw new Error("Invalid password");
  }
});

module.exports = LoginCtrl;
