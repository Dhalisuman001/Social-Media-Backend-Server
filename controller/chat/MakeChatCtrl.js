const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/chat");
const User = require("../../model/user/UserModel");

const ChatCreate = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  //   validId(id);
  if (!userId) throw Error("User not found");

  let isChat = await Chat.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastMessage");

  isChat = await User.populate(isChat, {
    path: "lastMessage.sender",
    select: "firstName lastName profilePhoto email",
  });

  if (isChat.length > 0) {
    console.log("Here");
    res.json(isChat[0]);
  } else {
    try {
      const chatData = {
        chatName: "sender",
        isGroup: false,
        users: [req.user._id, userId],
      };
      const chatCreated = await Chat.create(chatData);
      console.log("There");
      const fullChat = await Chat.findOne({
        _id: chatCreated._id,
      }).populate("users", "-password");
      res.json(fullChat);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
});

module.exports = ChatCreate;
