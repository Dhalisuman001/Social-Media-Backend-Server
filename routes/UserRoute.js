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
//user email otp verify route
UserRoute.route("/verified").get(AuthHandel,VerifyEmailOTPCtrl);
//fetch all users route
UserRoute.route("/").get(AuthHandel, FetchUsersCtrl);
//fetch single user route
UserRoute.route("/:id").get(AuthHandel, FetchUserCtrl);
//fetch user profile route
UserRoute.route("/profile/:id").get(AuthHandel, FetchProfileCtrl);
//user update route
UserRoute.route("/update").post(AuthHandel, UpdateUserCtrl);
// will be change
UserRoute.route("/avatar-update").put(
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
UserRoute.route("/forget-password").post(ForgetPasswordCtrl);

UserRoute.route("/change-password").post(ChangePassOTP);
//verify email route
UserRoute.route("/verify-email").post(AuthHandel, EmailVerificationCtrl);
//delete user route
UserRoute.route("/delete").delete(AuthHandel, DeleteUserCtrl);




module.exports = UserRoute;
