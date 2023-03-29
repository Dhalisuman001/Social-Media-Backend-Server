const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const updatePassword = expressAsyncHandler(async (req, res) => {
    const id = req.user._id;
    const { oldPassword, newPassword } = req.body;
    validId(id);
    const user = await User.findById(id);
    if (await user.CheckPassword(oldPassword)){
        user.password = newPassword;
        const updatedUser = await user.save();
        res.json({ message: "Password is updated", user: updatedUser });
    } 
    else {
        res.json({ message: "Old password is not matched" });
    }

});

module.exports = updatePassword;