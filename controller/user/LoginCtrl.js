const expressAsyncHandler = require("express-async-handler");
const getToken = require("../../config/token/getToken");
const User = require("../../model/user/UserModel");

const LoginCtrl = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new Error("Email does not exist!");
  }

  if (!user.active && user.deactivationTimeExpire < new Date())
    throw new Error("User account deleted");

  if (await user.CheckPassword(req.body.password)) {
    user.active = true;
    await user.save();
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      isVerified: user.isVerified,
      token: getToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid password");
  }
});

module.exports = LoginCtrl;
