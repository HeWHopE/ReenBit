module.exports = class UserDto {
  name;
  id;
  isActivated;

  constructor(model) {
    this.firstName = model.firstName;
    this.secondName = model.secondName;
    this.id = model._id;
  }
};
