const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const crypto = require("crypto");

// email updation
const VerifyNewEmailCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req.user;
  const { otp, newEmail } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Email doesn't exist");

  const hashedToken = crypto.createHash("sha256").update(otp).digest("hex");

  if (
    user.emailVerificationOTP !== hashedToken ||
    user.emailVerificationOTPExpire < new Date()
  ) {
    throw new Error("OTP has expiredddd!");
  }

  user.email = newEmail;
  user.isVerified = true;
  user.emailVerificationOTP = undefined;
  user.emailVerificationOTPExpire = undefined;
  //   user.new = true;
  await user.save();

  res.json({msg: "Verification Success", user});
});

module.exports = VerifyNewEmailCtrl;
