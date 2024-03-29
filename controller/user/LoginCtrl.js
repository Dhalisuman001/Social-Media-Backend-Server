const expressAsyncHandler = require("express-async-handler");
// const { validationResult } = require("express-validator");
const getToken = require("../../config/token/getToken");
const User = require("../../model/user/UserModel");

const LoginCtrl = expressAsyncHandler(async (req, res) => {
  // const errors = validationResult(req);

  //^Checking validation errors
  // if (!errors.isEmpty()) throw new Error(errors.array()[0].msg, 400);

  const user = await User.findOne({ email: req.body.email });

  if (!user) throw new Error("Email does not exist!");

  if (!user.active && user.deactivationTimeExpire < new Date())
    throw new Error("User account deleted");

  if (await user.CheckPassword(req.body.password)) {
    user.active = true;
    user.deactivationTimeExpire = undefined;
    await user.save();
    res.json({
      token: getToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid password");
  }
});

module.exports = LoginCtrl;
