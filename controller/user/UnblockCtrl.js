const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

//unblock user controller
const UnblockUserCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json({ message: "User is unblocked", user: user });
});

module.exports = UnblockUserCtrl;
