const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/chat");
const User = require("../../model/user/UserModel");

const CreateGroup = expressAsyncHandler(async (req, res) => {
  const { usersId, name } = req.body;

  if (!usersId) throw Error("Select users");

  if (usersId.length < 2) throw Error("Members should be more than 2");

  usersId.push(req.user._id);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: usersId,
      isGroup: true,
      admin: req.user._id,
    });

    const finalChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("lastMessage");
    res.json(finalChat);
  } catch (error) {
    res.json(error);
  }
});

module.exports = CreateGroup;
