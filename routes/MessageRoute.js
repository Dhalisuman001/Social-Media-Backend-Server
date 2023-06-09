const FetchMessages = require("../controller/messages/FetchMessages");
const MessageSend = require("../controller/messages/MessageSend");
const { AuthHandel } = require("../middleware");

const MessageRoute = require("express").Router();

MessageRoute.route("/").post(AuthHandel, MessageSend);
MessageRoute.route("/:chatId").get(AuthHandel, FetchMessages);
// MessageRoute.route("/group").post(AuthHandel, CreateGroup);
// MessageRoute.route("/group/rename").put(AuthHandel, GroupRename);
// MessageRoute.route("/group/add").put(AuthHandel, AddToGroup);
// MessageRoute.route("/group/remove").put(AuthHandel, RemoveMember);

module.exports = MessageRoute;
