const UserModel = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const UserDto = require("../dto/user-dto.js");
const ApiError = require("../exceptions/api-error.js");

class UserService {
  async registration(firstName, secondName) {
    const user = await UserModel.create({
      firstName,
      secondName,
    });
    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
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
