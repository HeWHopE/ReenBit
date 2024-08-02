const express = require("express");
const { body } = require("express-validator");
const messageController = require("../controllers/messageController.js");

const router = express.Router();

// Route to create a new message
router.post(
  "/message/",
  [
    body("senderId").isLength({ min: 2, max: 32 }),
    body("chatId").isLength({ min: 2, max: 32 }),
    body("text").isLength({ min: 1 }),
  ],
  messageController.createMessage
);

router.get("/messages/:chatId", messageController.getMessages);
router.get("/message/:messageId", messageController.getMessage);
router.put("/message/:messageId", messageController.updateMessage);
router.delete("/message/:messageId", messageController.deleteMessage);

module.exports = router;
