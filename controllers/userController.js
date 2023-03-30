const UserModel = require("../models/user.model");

const seeProfile = async (req, res) => {
  const user = await UserModel.findById("64250a76691c2197b7952f57");
  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  const user = new UserModel({
    firstname,
    lastname,
    username,
    email,
    password,
  });

  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(409).json(error);
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { firstname, lastname, username, email, password } = req.body;

  console.log(req.body);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      firstname,
      lastname,
      username,
      email,
      password,
    });

    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedUser = await UserModel.findByIdAndRemove(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(409).json(error);
  }
};

module.exports = {
  seeProfile,
  createUser,
  editUser,
  deleteUser,
};
