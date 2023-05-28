const DbConnect = require("./config/db/DbConnect");
const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const { notFound, errorHandler } = require("./middleware");
const PostRoute = require("./routes/PostRoute");
const CommentRoute = require("./routes/CommentRoute");
const StoryRoute = require("./routes/StoryRoute");
const ChatRoute = require("./routes/ChatRoute");
const app = express();

// Db Connection
DbConnect();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User routes
app.use("/api/user/", UserRoute);
// Post routes
app.use("/api/post/", PostRoute);
// Comment routes
app.use("/api/comment/", CommentRoute);
//Story routes
app.use("/api/story/", StoryRoute);
//Chat routes
app.use("/api/chat/", ChatRoute);

// Handeling Error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
