const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const validId = require("../../utils/isValid")

// deactivate account
const DeactivationCtrl = expressAsyncHandler(async(req, res) => {
    const myId = req.user._id;
    const email = req.body.email;
    const pass = req.body.password;

    validId(myId)

    const user = await User.findById(myId)

    if(user.email !== email) throw new Error("Incorrect Email")

    const checkPass = await user.CheckPassword(pass)

    if(!checkPass) throw new Error("Incorrect Password")

    try {
        const deactivate = await User.findByIdAndUpdate(
            myId,
            {
                active: false
            },
            {
                new: true
            }
        )

        res.json(deactivate)
    } catch (error) {
        res.json("Error is this: ", error)
    }
})

const ActivationCtrl = expressAsyncHandler(async(req, res) => {
    const myId = req.user._id;
    const email = req.body.email;
    const pass = req.body.password;

    validId(myId)

    const user = await User.findById(myId)

    if(user.email !== email) throw new Error("Incorrect Email")

    const checkPass = await user.CheckPassword(pass)

    if(!checkPass) throw new Error("Incorrect Password")

    try {
        const activate = await User.findByIdAndUpdate(
            myId,
            {
                active: true
            },
            {
                new: true
            }
        )

        res.json(activate)
    } catch (error) {
        res.json("Error is this: ", error)
    }
})

module.exports = { DeactivationCtrl, ActivationCtrl }