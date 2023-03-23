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
  DeleteUserCtrl,
  updatePassword,
  DeactivationCtrl,
  NewPassCtrl,
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
UserRoute.route("/login").post(LoginCtrl);
//user email otp verify route
UserRoute.route("/verified").get(AuthHandel, VerifyEmailOTPCtrl);
//fetch all users route
UserRoute.route("/").get(AuthHandel, FetchUsersCtrl);
//fetch user profile route
UserRoute.route("/profile").get(AuthHandel, FetchProfileCtrl);
//fetch single user route
UserRoute.route("/:id").get(AuthHandel, FetchUserCtrl);
//user update route
UserRoute.route("/update").post(AuthHandel, UpdateUserCtrl);
// will be change
UserRoute.route("/avatar-update").put(
  AuthHandel,
  PhotoUpload.single("image"),
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
UserRoute.route("/forget-password").post(ForgetPasswordCtrl);

UserRoute.route("/change-password").post(ChangePassOTP);

UserRoute.route("/new-password").post(NewPassCtrl);
//verify email route
UserRoute.route("/verify-email").post(AuthHandel, EmailVerificationCtrl);
//delete user route
UserRoute.route("/deleteduser").put(AuthHandel, DeleteUserCtrl);

UserRoute.route("/update-password").put(AuthHandel, updatePassword);

UserRoute.route("/inactive").put(AuthHandel, DeactivationCtrl);

module.exports = UserRoute;
