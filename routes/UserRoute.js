const UserRoute = require("express").Router();

const {
  RegisterCtrl,
  LoginCtrl,
  FetchUsersCtrl,
  FetchUserCtrl,
  EmailVerificationCtrl,
  FetchProfileCtrl,
  UpdateUserCtrl,
  BlockUserCtrl,
  UnblockUserCtrl,
  FollowingCtrl,
  UnfollowingCtrl,
  ForgetPasswordCtrl,
  ChangePassOTP,
  VerifyEmailOTPCtrl,
  ProfilePhotoUpdateCtrl,
} = require("../controller/user");

const {
  AuthHandel,
  PhotoUpload,
  profilePhotoResize,
} = require("../middleware");

// ! ROUTES START FROM HERE

//user register route
UserRoute.route("/register").post(RegisterCtrl);
//user login route
UserRoute.route("/login").get(LoginCtrl);
//fetch all users route
UserRoute.route("/").get(AuthHandel, FetchUsersCtrl);
//fetch single user route
UserRoute.route("/:id").get(AuthHandel, FetchUserCtrl);
//fetch user profile route
UserRoute.route("/profile/:id").get(AuthHandel, FetchProfileCtrl);
//user update route
UserRoute.route("/update").post(AuthHandel, UpdateUserCtrl);
// will be change
UserRoute.route("/avatar-update/:id").put(
  AuthHandel,
  PhotoUpload.single("image"),
  profilePhotoResize,
  ProfilePhotoUpdateCtrl
);
//block user route
UserRoute.route("/block/:id").put(AuthHandel, BlockUserCtrl);
//unblock user route
UserRoute.route("/unblock/:id").put(AuthHandel, UnblockUserCtrl);
//following user route
UserRoute.route("/follow").post(AuthHandel, FollowingCtrl);
//unfollowing user route
UserRoute.route("/unfollow").post(AuthHandel, UnfollowingCtrl);
//forget password route
UserRoute.route("/forget-password").get(ForgetPasswordCtrl);

UserRoute.route("/change-password").get(ChangePassOTP);
//verify email route
UserRoute.route("/verify-email").get(AuthHandel, EmailVerificationCtrl);

UserRoute.route("/verified").get(VerifyEmailOTPCtrl);

module.exports = UserRoute;
