const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");

// change password otp
const NewPassCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password, token } = req.body;

  const user = await User.findOne({ email });

  if (user.changePasswordOTP !== token) throw new Error("Token has expired!");

  user.password = password;
  user.changePasswordOTP = undefined;
  user.forgotPasswordTokenExpire = undefined;
  await user.save();

  res.send("SUCCESS");
});

module.exports = NewPassCtrl;
