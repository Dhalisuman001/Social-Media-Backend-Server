const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const crypto = require("crypto");

// change password otp
const ChangePassOTPCtrl = expressAsyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  const hashedToken = crypto.createHash("sha256").update(otp).digest("hex");

  if (
    user.changePasswordOTP !== hashedToken ||
    user.forgotPasswordTokenExpire < new Date()
  )
    throw new Error("OTP has expired!");

  // user.password = password;
  // user.changePasswordOTP = undefined;
  // user.forgotPasswordTokenExpire = undefined;
  // await user.save();

  res.send(hashedToken);
});

module.exports = ChangePassOTPCtrl;
