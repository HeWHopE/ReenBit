const ApiError = require("../exceptions/api-error.js");
const chatModel = require("../models/chat-model.js");
const UserModel = require("../models/user-model.js");
class UserService {
  async ifUserExists(id) {
    if (!id) {
      throw ApiError.BadRequest("Id is not defined");
    }
    const user = await UserModel.findById(id);
    if (!user) return false;
    return true;
  }

  async create(firstId, secondId) {
    if (
      !(await this.ifUserExists(firstId)) ||
      !(await this.ifUserExists(secondId))
    ) {
      throw ApiError.BadRequest("User not found");
    }

    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return { chat };
    }

    const newChat = await chatModel.create({
      members: [firstId, secondId],
    });

    return { newChat };
  }

  async getUsers() {
    const users = await UserModel.find();
    console.log(users);
    return users;
  }

  async getUser(id) {
    if (!id) {
      throw ApiError.BadRequest("Id is not defined");
    }
    const user = await UserModel.findById(id);
    if (!user) throw ApiError.BadRequest("User not found");

    return user;
  }

  async update(id, firstName, secondName) {
    if (!id) {
      throw ApiError.BadRequest("Id is not defined");
    }
    const user = await UserModel.findById(id);
    if (firstName) {
      user.firstName = firstName;
    }
    if (secondName) {
      user.secondName = secondName;
    }
    await user.save();
    return user;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest("Id is not defined");
    }
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }
}

module.exports = new UserService();
