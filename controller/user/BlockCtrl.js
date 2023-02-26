const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

//block user controller
const BlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json({ message: "User is blocked", user: user });
});

module.exports = BlockUserCtrl;
