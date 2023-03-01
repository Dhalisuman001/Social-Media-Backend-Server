
const PostRoute = require("express").Router();

const {
  FetchPostsCtrl,
  FetchPostCtrl,
  PostCreateCtrl,
  PostLikeCtrl,
  updatePostCtrl,
  DeletePostCtrl
} = require("../controller/post");

const { AuthHandel, PhotoUpload } = require("../middleware");
const { PostPhotoResize } = require("../middleware/upload/PhotoUpload");



PostRoute.route("/create").post(
  AuthHandel,
  PhotoUpload.single("image"),
  PostPhotoResize,
  PostCreateCtrl
);
PostRoute.route("/like").put(AuthHandel, PostLikeCtrl);
PostRoute.route("/").get(AuthHandel, FetchPostsCtrl);
PostRoute.route("/:id").get(AuthHandel, FetchPostCtrl);
PostRoute.route("/update").put(AuthHandel, updatePostCtrl);
PostRoute.route("/delete").delete(AuthHandel, DeletePostCtrl);



module.exports = PostRoute;
