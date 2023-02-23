const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const crypto = require("crypto");

const VerifyOTPCtrl = expressAsyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    changePasswordOTP: hashedToken,
    forgotPasswordTokenExpire: { $gt: new Date() },
  });

  if (!user) throw new Error("OTP has expires");

  user.password = password;
  user.changePasswordOTP = undefined;
  user.forgotPasswordTokenExpire = undefined;
  await user.save();

  res.json(user);
});

module.exports = VerifyOTPCtrl;
