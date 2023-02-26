const FetchUserCtrl = require("../controller/user/FetchUser");
const FetchUsersCtrl = require("../controller/user/FetchUsers");
const LoginCtrl = require("../controller/user/LoginCtrl");
const RegisterCtrl = require("../controller/user/RegisterCtrl");
const UpdateUserCtrl = require("../controller/user/UpdateUserCtrl");
const FetchProfileCtrl = require("../controller/user/FetchProfile");
const { BlockUser, UnblockUser } = require("../controller/user/UserBlockCtrl");
const ForgetPasswordCtrl = require("../controller/user/ForgetPasswordCtrl");
const ProfilePhotoUpdateCtrl = require("../controller/user/ProfilePhotoUpdateCtrl");
const {
  PhotoUpload,
  profilePhotoResize,
} = require("../middleware/upload/PhotoUpload");
const ChangePassOTP = require("../controller/user/ChangePassOTP");
const EmailVerificationCtrl = require("../controller/user/EmailVerififcation");
const { VerifyEmailOTPCtrl } = require("../controller/user/VerifyEmailOTP");
const AuthHandel = require("../middleware/auth/AuthHandler");
const UserRoute = require("express").Router();

//
//
//
//
// ! ROUTES START FROM HERE

UserRoute.route("/register").post(RegisterCtrl);

UserRoute.route("/verify-email").get(EmailVerificationCtrl);
UserRoute.route("/verified").get(VerifyEmailOTPCtrl);

// will be change
UserRoute.route("/photo-upload/:id").put(
  PhotoUpload.single("image"),
  profilePhotoResize,
  ProfilePhotoUpdateCtrl
);
UserRoute.route("/forget-password").get(ForgetPasswordCtrl);
UserRoute.route("/change-pass").get(ChangePassOTP);
UserRoute.route("/login").get(LoginCtrl);
UserRoute.route("/:id").get(AuthHandel, FetchUserCtrl);
UserRoute.route("/").get(AuthHandel, FetchUsersCtrl);
UserRoute.route("/updateuser/:id").post(UpdateUserCtrl);
UserRoute.route("/profile/:id").get(FetchProfileCtrl);
UserRoute.route("/blockuser/:id").put(BlockUser);
UserRoute.route("/unblockuser/:id").put(UnblockUser);

module.exports = UserRoute;
