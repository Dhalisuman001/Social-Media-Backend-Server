const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/chat");
const User = require("../../model/user/UserModel");
const Message = require("../../model/message");

const MessageSend = expressAsyncHandler(async (req, res) => {
  const { chatId, message } = req.body;
  //   validId(id);
  if (!chatId || !message) throw Error("Chat not found");

  const Messages = {
    sender: req.user._id,
    content: message,
    chat: chatId,
  };

  try {
    let FinalMessage = await Message.create(Messages);
    FinalMessage = await FinalMessage.populate(
      "sender",
      "firstName lastName profilePhoto"
    );
    FinalMessage = await FinalMessage.populate("chat");
    FinalMessage = await User.populate(FinalMessage, {
      path: "chat.users",
      select: "firstName lastName profilePhoto",
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: FinalMessage,
    });

    res.json(FinalMessage);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = MessageSend;
