const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid")

// deactivate account
const DeactivationCtrl = expressAsyncHandler(async(req, res) => {
    const myId = req.user._id;
    // const email = req.body.email;
    const pass = req.body.password;

    validId(myId)

    const user = await User.findById(myId)

    // if(user.email !== email) throw new Error("Incorrect Email")

    const checkPass = await user.CheckPassword(pass)

    if(!checkPass) throw new Error("Incorrect Password")

    try {
        const deactivate = await User.findByIdAndUpdate(
            myId,
            {
                active: false,
                deactivationTimeExpire: Date.now() + 90 * 24 * 60 * 60 * 1000
            },
            {
                new: true
            }
        )

        res.json({ message: "User is deactivated", deactivate: deactivate })
    } catch (error) {
        res.json(error)
    }
})

module.exports = DeactivationCtrl