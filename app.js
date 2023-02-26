const DbConnect = require("./config/db/DbConnect");
const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const { notFound, errorHandler } = require("./middleware");
const app = express();

// Db Connection
DbConnect();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User routes
app.use("/api/user/", UserRoute);

// Handeling Error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
