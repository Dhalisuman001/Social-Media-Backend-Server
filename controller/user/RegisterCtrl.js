const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const getToken = require("../../config/token/getToken");

const RegisterCtrl = expressAsyncHandler(async (req, res) => {
  const CheckEmail = await User.findOne({ email: req.body.email });

  if (CheckEmail) {
    throw new Error("Email already exists");
  }

  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    });
    res.json({
      token: getToken(user.id)
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = RegisterCtrl;
