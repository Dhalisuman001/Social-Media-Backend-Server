const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const FetchUserCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validId(id);

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = FetchUserCtrl;
