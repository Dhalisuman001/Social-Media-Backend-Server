const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/chat");

const AddToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId) throw Error("Select chat");
  if (!userId) throw Error("Select user");

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
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

module.exports = AddToGroup;
