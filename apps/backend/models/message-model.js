const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },

  { timestamps: true },
);

const messageModel = mongoose.model("Messages", messagesSchema);

module.exports = messageModel;
