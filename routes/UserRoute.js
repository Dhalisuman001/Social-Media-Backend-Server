const FetchUserCtrl = require("../controller/user/FetchUser");
const FetchUsersCtrl = require("../controller/user/FetchUsers");
const LoginCtrl = require("../controller/user/LoginCtrl");
const RegisterCtrl = require("../controller/user/RegisterCtrl");
const UserRoute = require("express").Router();

UserRoute.route("/register").post(RegisterCtrl);
UserRoute.route("/login").get(LoginCtrl);
UserRoute.route("/:id").get(FetchUserCtrl);
UserRoute.route("/").get(FetchUsersCtrl);

module.exports = UserRoute;
