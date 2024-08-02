const userService = require("../service/user-service.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js");
class UserController {
  async create(req, res, next) {
    try {
      // Check if the request body is in JSON format
      if (!req.is("application/json")) {
        // If not, return a 400 Bad Request response with an error message
        return res
          .status(400)
          .json({ error: "Invalid request format. Expected JSON." });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const [firstName, secondName] = [req.body.firstName, req.body.secondName];
      const userData = await userService.registration(firstName, secondName);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { firstName, secondName } = req.body;
      const { id } = req.params;
      const user = await userService.update(id, firstName, secondName);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await userService.delete(id);
      return res.json({ message: "User deleted" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
