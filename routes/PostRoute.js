const PostCreateCtrl = require("../controller/post/PostCreate");
const { AuthHandel, PhotoUpload } = require("../middleware");
const { PostPhotoResize } = require("../middleware/upload/PhotoUpload");

const PostRoute = require("express").Router();

PostRoute.route("/create").post(
  AuthHandel,
  PhotoUpload.single("image"),
  PostPhotoResize,
  PostCreateCtrl
);

module.exports = PostRoute;
