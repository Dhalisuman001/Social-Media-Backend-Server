const RegisterCtrl = require("../controller/RegisterCtrl");
const UserRoute = require("express").Router();

UserRoute.route("/register").post(RegisterCtrl);

module.exports = UserRoute;
