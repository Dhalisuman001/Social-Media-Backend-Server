const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/chat");
const User = require("../../model/user/UserModel");

const FetchChat = expressAsyncHandler(async (req, res) => {
  try {
    const chat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("lastMessage")
      .populate("admin", "-password")
      .sort({ updateAt: -1 });

    const finalChat = await User.populate(chat, {
      path: "lastMessage.sender",
      select: "firstName lastName profilePhoto email",
    });

    res.json(finalChat);
  } catch (error) {
    res.json(error);
  }
});

module.exports = FetchChat;
