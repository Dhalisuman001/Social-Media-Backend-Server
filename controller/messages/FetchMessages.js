const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/chat");
const User = require("../../model/user/UserModel");
const Message = require("../../model/message");

const FetchMessages = expressAsyncHandler(async (req, res) => {
  const { chatId } = req.params;
  //   validId(id);
  if (!chatId) throw Error("Chat not found");

  try {
    let FinalMessage = await Message.find({ chat: chatId })
      .populate("sender", "firstName lastName profilePhoto email")
      .populate("chat");

    res.json(FinalMessage);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = FetchMessages;
