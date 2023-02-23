const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const blockCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validId(id);

  try {
    const blockUser = await User.findByIdAndUpdate(id, {
      isBlocked: true,
    });
    res.json({ success: "User is now blocked", user: blockUser });
  } catch (error) {
    res.status(500);
    res.json(`Error 500: User couldn't be blocked due to ${error}`);
  }
});

const unblockCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validId(id);

  try {
    const unblockUser = await User.findByIdAndUpdate(id, {
      isBlocked: false,
    });

    res.json({
      success: "User can now use the platform again",
      user: unblockUser,
    });
  } catch (error) {
    res.status(500);
    res.json(`Error 500: User couldn't be unblocked due to ${error}`);
  }
});

module.exports = { blockCtrl, unblockCtrl };
