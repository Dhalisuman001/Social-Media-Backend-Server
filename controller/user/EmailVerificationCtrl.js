const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// send the otp to the user's mail
const EmailVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Email does not exist");

  try {
    const OTP = await user.getEmailVerificationOTP();
    await user.save();
    const content = `This is your 6 digit OTP ${OTP}. Please verify this email within 5 minutes.`;

    const mail = {
      to: email,
      from: "socialmediahelp.11919@gmail.com",
      subject: "Email Verification",
      text: content,
    };

    await sgMail.send(mail);
    res.json(mail);
  } catch (error) {
    res.json(error);
  }
});

module.exports = EmailVerificationCtrl;
