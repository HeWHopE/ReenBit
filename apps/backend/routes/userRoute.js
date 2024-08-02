const Router = require("express").Router;
const userController = require("../controllers/userController.js");
const { body } = require("express-validator");
const router = new Router();

router.post(
  "/users",
  body("firstName").isLength({ min: 2, max: 32 }),
  body("secondName").isLength({ min: 2, max: 32 }),
  userController.create
);

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);

router.put("/users/:id", userController.update);

router.delete("/users/:id", userController.delete);

module.exports = router;
