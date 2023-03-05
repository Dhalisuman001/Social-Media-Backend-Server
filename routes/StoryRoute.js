const StoryRoute = require("express").Router();
const StoryCreateCtrl = require("../controller/story/CreateStory");
const StoryPhoto = require("../middleware/upload/StoryPhoto");
const { AuthHandel, PhotoUpload } = require("../middleware");

StoryRoute.route("/create").post(AuthHandel, StoryPhoto.single('image'), StoryCreateCtrl);

module.exports = StoryRoute;