const FetchChat = require("../controller/chat/GetChat");
const CreateGroup = require("../controller/chat/GroupCreate");
const AddToGroup = require("../controller/chat/GroupMemberAdd");
const RemoveMember = require("../controller/chat/GroupMemberRemove");
const ChatCreate = require("../controller/chat/MakeChatCtrl");
const GroupRename = require("../controller/chat/RenameGroup");

const { AuthHandel } = require("../middleware");

const ChatRoute = require("express").Router();

ChatRoute.route("/").post(AuthHandel, ChatCreate);
ChatRoute.route("/").get(AuthHandel, FetchChat);
ChatRoute.route("/group").post(AuthHandel, CreateGroup);
ChatRoute.route("/group/rename").put(AuthHandel, GroupRename);
ChatRoute.route("/group/add").put(AuthHandel, AddToGroup);
ChatRoute.route("/group/remove").put(AuthHandel, RemoveMember);

module.exports = ChatRoute;
