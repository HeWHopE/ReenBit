const messageModel = require("../models/message-model");
const { validationResult } = require("express-validator");

class MessageController {
  async createMessage(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { chatId, senderId, text } = req.body;
      const newMessage = new messageModel({
        chatId,
        senderId,
        text,
      });

      const response = await newMessage.save();
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getMessages(req, res) {
    try {
      const { chatId } = req.params; // Fix destructuring
      const messages = await messageModel.find({ chatId });

      res.status(200).json({ messages });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getMessage(req, res) {
    try {
      const { messageId } = req.params; // Fix destructuring
      const message = await messageModel.findById(messageId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(200).json({ message });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async updateMessage(req, res) {
    try {
      const { messageId } = req.params; // Fix destructuring
      const { text } = req.body;
      const message = await messageModel.findByIdAndUpdate(
        messageId,
        { text },
        { new: true }
      );
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(200).json(message);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async deleteMessage(req, res) {
    try {
      const { messageId } = req.params; // Fix destructuring
      const message = await messageModel.findByIdAndDelete(messageId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(200).json(message);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new MessageController();
