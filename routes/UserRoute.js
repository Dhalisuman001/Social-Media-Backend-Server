const UserRoute = require("express").Router();

const { 
  RegisterCtrl, 
  LoginCtrl, 
  FetchUsersCtrl, 
  FetchUserCtrl, 
  EmailVerificationCtrl, 
  FetchProfileCtrl, 
  UpdateUserCtrl, 
  BlockUser, 
  UnblockUser, 
  FollowingCtrl, 
  UnfollowingCtrl, 
  ForgetPasswordCtrl, 
  ChangePassOTP, 
  VerifyEmailOTPCtrl, 
  ProfilePhotoUpdateCtrl 
} = require("../controller/user");

const AuthHandel = require("../middleware/auth/AuthHandler");

const {
  PhotoUpload,
  profilePhotoResize,
} = require("../middleware/upload/PhotoUpload");


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
UserRoute.route("/profile/:id").get(FetchProfileCtrl);
//user update route
UserRoute.route("/updateuser/:id").post(UpdateUserCtrl);
// will be change
UserRoute.route("/photo-upload/:id").put(
  PhotoUpload.single("image"),
  profilePhotoResize,
  ProfilePhotoUpdateCtrl
);
//block user route
UserRoute.route("/blockuser/:id").put(BlockUser);
//unblock user route
UserRoute.route("/unblockuser/:id").put(UnblockUser);
//following user route
UserRoute.route("/following").post(AuthHandel, FollowingCtrl);
//unfollowing user route
UserRoute.route("/unfollowing").post(AuthHandel, UnfollowingCtrl);
//forget password route
UserRoute.route("/forget-password").get(ForgetPasswordCtrl);

UserRoute.route("/change-pass").get(ChangePassOTP);
//verify email route
UserRoute.route("/verify-email").get(EmailVerificationCtrl);

UserRoute.route("/verified").get(VerifyEmailOTPCtrl);



module.exports = UserRoute;
