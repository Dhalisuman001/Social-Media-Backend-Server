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
  ForgetPasswordCtrl,
  ChangePassOTP,
  VerifyEmailOTPCtrl,
  ProfilePhotoUpdateCtrl,
  DeleteUserCtrl,
  updatePassword,
  DeactivationCtrl,
  NewPassCtrl,
  FetchFollowersCtrl,
  FetchFollowingCtrl,
} = require("../controller/user");

const {
  AuthHandel,
  PhotoUpload,
  profilePhotoResize,
} = require("../middleware");

// ! ROUTES START FROM HERE

// User register
UserRoute.route("/register").post(RegisterCtrl);

// User login
UserRoute.route("/login").post(LoginCtrl);

// Send otp to email for verification
UserRoute.route("/verified").get(AuthHandel, VerifyEmailOTPCtrl);

// Verify user email
UserRoute.route("/verify-email").post(AuthHandel, EmailVerificationCtrl);

// Fetch all users
UserRoute.route("/").get(AuthHandel, FetchUsersCtrl);

// Fetch user profile
UserRoute.route("/profile").get(AuthHandel, FetchProfileCtrl);

// Fetch single user other than me
UserRoute.route("/:id").get(AuthHandel, FetchUserCtrl);

// User update personal info
UserRoute.route("/update").post(AuthHandel, UpdateUserCtrl);

// will be change
UserRoute.route("/avatar-update").put(
  AuthHandel,
  PhotoUpload.single("image"),
  ProfilePhotoUpdateCtrl
);

// Admin block user
UserRoute.route("/block/:id").put(AuthHandel, BlockUserCtrl);

// Admin unblock user
UserRoute.route("/unblock/:id").put(AuthHandel, UnblockUserCtrl);

// follow/unfollow another user
UserRoute.route("/follow").post(AuthHandel, FollowingCtrl);

// Request for Changing Password
UserRoute.route("/forget-password").post(ForgetPasswordCtrl);

// Verify Otp for changing password request 
UserRoute.route("/change-password").post(ChangePassOTP);

// Set New Password
UserRoute.route("/new-password").post(NewPassCtrl);

// Delete user profile
UserRoute.route("/deleteduser").put(AuthHandel, DeleteUserCtrl);

// Update Password
UserRoute.route("/update-password").put(AuthHandel, updatePassword);

//Deactivate user profile
UserRoute.route("/inactive").put(AuthHandel, DeactivationCtrl);

// Fetch myFollowers
UserRoute.route("/profile/my-followers").get(AuthHandel, FetchFollowersCtrl);

// Fetch myFollowing
UserRoute.route("/profile/my-following").get(AuthHandel, FetchFollowingCtrl);

module.exports = UserRoute;
