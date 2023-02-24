const FetchUserCtrl = require("../controller/user/FetchUser");
const FetchUsersCtrl = require("../controller/user/FetchUsers");
const LoginCtrl = require("../controller/user/LoginCtrl");
const RegisterCtrl = require("../controller/user/RegisterCtrl");
const UpdateUserCtrl = require("../controller/user/UpdateUserCtrl");
const FetchProfileCtrl = require("../controller/user/FetchProfile")
const { BlockUser, UnblockUser } = require("../controller/user/UserBlockCtrl");
const ForgetPasswordCtrl = require("../controller/user/ForgetPasswordCtrl");
const VerifyOTPCtrl = require("../controller/user/VerifyOTP");
const UserRoute = require("express").Router();

UserRoute.route("/register").post(RegisterCtrl);
UserRoute.route("/forget-password").get(ForgetPasswordCtrl);
UserRoute.route("/verify-otp").get(VerifyOTPCtrl);
UserRoute.route("/login").get(LoginCtrl);
UserRoute.route("/:id").get(FetchUserCtrl);
UserRoute.route("/").get(FetchUsersCtrl);
UserRoute.route("/updateuser/:id").post(UpdateUserCtrl);
UserRoute.route("/profile/:id").get(FetchProfileCtrl)
UserRoute.route("/blockuser/:id").put(BlockUser);
UserRoute.route("/unblockuser/:id").put(UnblockUser);

module.exports = UserRoute;
