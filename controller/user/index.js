const { ChangePassOTP } = require("./ChangePassOTP")
const { EmailVerificationCtrl } = require("./EmailVerification")
const { FetchProfileCtrl } = require("./FetchProfile")
const { FetchUserCtrl } = require("./FetchUser")
const { FetchUsersCtrl } = require("./FetchUsers")
const { FollowingCtrl } = require("./FollowingCtrl")
const { UnfollowingCtrl } = require("./UnfollowingCtrl")
const { LoginCtrl } = require("./LoginCtrl")
const { ProfilePhotoUpdateCtrl } = require("./ProfilePhotoUpdateCtrl")
const { RegisterCtrl } = require("./RegisterCtrl")
const { UpdateUser } = require("./UpdateUserCtrl")
const { BlockUser, UnblockUser } = require("./UserBlockCtrl")
const { VerifyEmailOTPCtrl } = require("./VerifyEmailOTP")


module.exports = { ChangePassOTP,
    EmailVerificationCtrl,
    FetchProfileCtrl,
    FetchUserCtrl,
    FetchUsersCtrl,
    FollowingCtrl,
    UnfollowingCtrl,
    LoginCtrl,
    ProfilePhotoUpdateCtrl,
    RegisterCtrl,
    UpdateUser,
    BlockUser,
    UnblockUser,
    VerifyEmailOTPCtrl, }
