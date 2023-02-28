const { CreateCommentCtrl } = require("../controller/comment/CreateComment");
const { AuthHandel } = require("../middleware");

const CommentRoute = require("express").Router();

CommentRoute.route("/create").post(AuthHandel, CreateCommentCtrl)

module.exports = CommentRoute