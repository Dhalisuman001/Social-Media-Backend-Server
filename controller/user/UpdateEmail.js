const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const UpdateEmailCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req.user;
  const { oldPassword, newEmail } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Email does not exist");

  if (await user.CheckPassword(oldPassword)) {
    try {
      const OTP = await user.getEmailVerificationOTP();
      await user.save();
      const content = `This is your 6 digit OTP ${OTP} for updating your email. Please verify this email within 5 minutes.`;

      const mail = {
        to: newEmail,
        from: "socialmediahelp.11919@gmail.com",
        subject: "Email Verification",
        text: content,
      };

      await sgMail.send(mail);
      res.json(mail);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ message: "Old password is not matched" });
  }
});

module.exports = UpdateEmailCtrl;
