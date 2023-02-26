const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

exports.UpdateUserCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.user;
  validId(id);

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  } catch (error) {
    throw new Error(`Invalid user`);
  }
});
