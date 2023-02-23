const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const isValid = require("../../utils/isValid");


//block user controller
exports.BlockUser = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    isValid(id);

    const user = await User.findByIdAndUpdate(
        id,
        {
            isBlocked: true,
        },
        { new: true }
    );
    res.json({ sucess: "User is blocked", user: user });
});


//unblock user controller
exports.UnblockUser = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    isValid(id);

    const user = await User.findByIdAndUpdate(
        id,
        {
            isBlocked: false,
        },
        { new: true }
    );
    res.json({ sucess: "User is unblocked", user: user });
});