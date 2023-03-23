const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid");

const DeleteUserCtrl = expressAsyncHandler(async (req, res) => {
    const id = req.user._id;
    // const email = req.body.email;
    const pass = req.body.password;

    validId(myId)

    const user = await User.findById(myId)

    // if(user.email !== email) throw new Error("Incorrect Email")

    const checkPass = await user.CheckPassword(pass)

    if(!checkPass) throw new Error("Incorrect Password")

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({ message: "User is deleted", deleteUser: deleteUser });
    } catch (error) {
        res.json(error);
    }

});

module.exports = DeleteUserCtrl;