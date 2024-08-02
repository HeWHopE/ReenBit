const express = require("express");
const { body } = require("express-validator");

const chatController = require("../controllers/chatController.js");

const router = express.Router();

router.post(
  "/",
  body("firstId").isLength({ min: 2, max: 32 }),
  body("secondId").isLength({ min: 2, max: 32 }),
  chatController.createChat
);
router.get("/:chatId", chatController.findChat);
router.delete("/:chatId", chatController.deleteChat);
module.exports = router;
