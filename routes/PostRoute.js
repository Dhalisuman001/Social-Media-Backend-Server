const { FetchPostsCtrl } = require("../controller/post/FetchPosts");
const { FetchPostCtrl } = require("../controller/post/FetchSinglePost");
const PostCreateCtrl = require("../controller/post/PostCreate");
const PostLikeCtrl = require("../controller/post/PostLikeCtrl");
const { AuthHandel, PhotoUpload } = require("../middleware");
const { PostPhotoResize } = require("../middleware/upload/PhotoUpload");

const PostRoute = require("express").Router();

PostRoute.route("/create").post(
  AuthHandel,
  PhotoUpload.single("image"),
  PostPhotoResize,
  PostCreateCtrl
);
PostRoute.route("/like").put(AuthHandel, PostLikeCtrl);
PostRoute.route("/").get(AuthHandel, FetchPostsCtrl)
PostRoute.route("/:id").get(AuthHandel, FetchPostCtrl)

module.exports = PostRoute;
