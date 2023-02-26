const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.ForgetPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Email does not exist");

  try {
    const OTP = await user.getPasswordResetOTP();
    await user.save();
    const body = `This is your 6 digit OTP ${OTP} to reset password, it will expire within 5 minutes`;

    const msg = {
      to: email,
      from: "socialmediahelp.11919@gmail.com",
      subject: "Change Password",
      text: body,
    };

    await sgMail.send(msg);
    res.json(msg);
  } catch (error) {
    res.json(error);
  }
});

