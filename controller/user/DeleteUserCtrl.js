const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const DeleteUserCtrl = expressAsyncHandler(async (req, res) => {
    const id = req.user._id;
    validId(id);

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({ message: "User is deleted", deleteUser: deleteUser });
    } catch (error) {
        res.json(error);
    }

});

module.exports = DeleteUserCtrl;