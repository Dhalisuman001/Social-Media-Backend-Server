const PostCreateCtrl = require("./PostCreate");
const PostLikeCtrl = require("./PostLikeCtrl");
const FetchPostsCtrl = require("./FetchPosts");
const FetchPostCtrl = require("./FetchSinglePost");
const updatePostCtrl = require("./UpdatePostCtrl");
const DeletePostCtrl = require("./DeletePostCtrl");
const FetchAllPost = require("./FeedPostCtrl");

module.exports = {
  PostCreateCtrl,
  PostLikeCtrl,
  FetchPostsCtrl,
  FetchPostCtrl,
  updatePostCtrl,
  DeletePostCtrl,
  FetchAllPost,
};
