const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = newSchema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  //   images: [{ title: { type: String }, img: { type: String } }],
  images: [{ title: String, img: String }],
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
