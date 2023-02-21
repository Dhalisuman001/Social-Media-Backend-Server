const RegisterCtrl = require("../controller/user/RegisterCtrl");
const UserRoute = require("express").Router();

UserRoute.route("/register").post(RegisterCtrl);

module.exports = UserRoute;
