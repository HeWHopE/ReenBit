const chatModel = require("../models/chat-model");
const chatService = require("../service/chat-service.js");
const { validationResult } = require("express-validator");

class ChatController {
  async createChat(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstId, secondId } = req.body;
      const chatData = await chatService.create(firstId, secondId);
      console.log(chatData);
      res.json(chatData);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async findUserChats(req, res) {
    try {
      const { userId } = req.params;
      const chats = await chatModel.find({
        members: { $in: [userId] },
      });
      res.status(200).json({ chats });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async findChat(req, res) {
    try {
      const id = req.params;

      const chat = await chatModel.findOne({
        id: id,
      });
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
      res.status(200).json({ chat });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async deleteChat(req, res) {
    try {
      const { chatId } = req.params;
      const chat = await chatModel.findByIdAndDelete(chatId);
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
      res.status(200).json(chat);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new ChatController();
