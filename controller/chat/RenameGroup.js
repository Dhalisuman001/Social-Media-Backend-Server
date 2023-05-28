const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/chat");

const GroupRename = expressAsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  if (!chatId) throw Error("Select chat");

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("lastMessage");

    res.json(updatedChat);
  } catch (error) {
    res.json(error);
  }
});

module.exports = GroupRename;
