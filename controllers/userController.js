const UserModel = require("../models/user.model");

const seeProfile = async (req, res) => {
  const user = await UserModel.findById("64250a76691c2197b7952f57");
  return res.status(200).json(user);
};

const signUp = async (req, res) => {
  const { firstname, lastname, username, email, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(409).json("Error in passwords");
  }

  //Ver si tengo que chequear aca si ya existe ese usuario o email en la BD o si cuando intenta crearlo, como en el modelo ya dice q es unico tira el error con el keyValue q dice q ya existe ese usuario o mail.

  try {
    const user = new UserModel({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    user.password = await user.encryptPassword(password);
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

const login = async (req, res) => {
  res.send("Login");
};
const logout = async (req, res) => {
  res.send("Logout");
};

module.exports = {
  seeProfile,
  signUp,
  editUser,
  deleteUser,
  login,
  logout,
};
