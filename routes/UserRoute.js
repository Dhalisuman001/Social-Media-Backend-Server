const FetchUserCtrl = require("../controller/user/FetchUser");
const FetchUsersCtrl = require("../controller/user/FetchUsers");
const LoginCtrl = require("../controller/user/LoginCtrl");
const RegisterCtrl = require("../controller/user/RegisterCtrl");
const UpdateUserCtrl = require("../controller/user/UpdateUserCtrl");
const FetchProfileCtrl = require("../controller/user/FetchProfile");
const { blockCtrl, unblockCtrl } = require("../controller/user/blockCtrl");
const UserRoute = require("express").Router();

UserRoute.route("/register").post(RegisterCtrl);
UserRoute.route("/login").get(LoginCtrl);
UserRoute.route("/:id").get(FetchUserCtrl);
UserRoute.route("/").get(FetchUsersCtrl);
UserRoute.route("/updateuser/:id").post(UpdateUserCtrl);
UserRoute.route("/profile/:id").get(FetchProfileCtrl)
UserRoute.route("/blocked/:id").post(blockCtrl)
UserRoute.route("/unblocked/:id").post(unblockCtrl)

module.exports = UserRoute;
