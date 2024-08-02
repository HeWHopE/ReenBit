const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstName: { type: String, unique: false, required: true },
  secondName: { type: String, unique: false, required: true },
});

module.exports = model("User", UserSchema);
