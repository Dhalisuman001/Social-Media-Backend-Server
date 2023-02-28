const ChangePassOTP = require("./ChangePassOTPCtrl");
const EmailVerificationCtrl = require("./EmailVerificationCtrl");
const FetchProfileCtrl = require("./FetchProfileCtrl");
const FetchUserCtrl = require("./FetchUserCtrl");
const FetchUsersCtrl = require("./FetchUsersCtrl");
const FollowingCtrl = require("./FollowingCtrl");
const UnfollowingCtrl = require("./UnfollowingCtrl");
const LoginCtrl = require("./LoginCtrl");
const ProfilePhotoUpdateCtrl = require("./ProfilePhotoUpdateCtrl");
const RegisterCtrl = require("./RegisterCtrl");
const UpdateUserCtrl = require("./UpdateUserCtrl");
const VerifyEmailOTPCtrl = require("./VerifyEmailOTPCtrl");
const ForgetPasswordCtrl = require("./ForgetPasswordCtrl");
const BlockUserCtrl = require("./BlockCtrl");
const UnblockUserCtrl = require("./UnblockCtrl");
const DeleteUserCtrl = require("./DeleteUserCtrl");
const updatePassword = require("./UpdatePassword");
const { DeactivationCtrl, ActivationCtrl } = require("./IsActiveCtrl")

module.exports = {
  ChangePassOTP,
  EmailVerificationCtrl,
  FetchProfileCtrl,
  FetchUserCtrl,
  FetchUsersCtrl,
  FollowingCtrl,
  UnfollowingCtrl,
  LoginCtrl,
  ProfilePhotoUpdateCtrl,
  RegisterCtrl,
  UpdateUserCtrl,
  UnblockUserCtrl,
  VerifyEmailOTPCtrl,
  ForgetPasswordCtrl,
  BlockUserCtrl,
  DeleteUserCtrl,
  updatePassword,
  DeactivationCtrl,
  ActivationCtrl
};
