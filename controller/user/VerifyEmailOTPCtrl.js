const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const crypto = require("crypto");

// email verification
const VerifyEmailOTPCtrl = expressAsyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Email doesn't exist");

  const hashedToken = crypto.createHash("sha256").update(otp).digest("hex");

  if (
    user.emailVerificationOTP !== hashedToken ||
    user.emailVerificationOTPExpire < new Date()
  ) {
    throw new Error("OTP has expiredddd!");
  }

  user.isVerified = true;
  user.emailVerificationOTP = undefined;
  user.emailVerificationOTPExpire = undefined;
  //   user.new = true;
  await user.save();

  res.json(user);
});

module.exports = VerifyEmailOTPCtrl;
