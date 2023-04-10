const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const seeProfile = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  console.log(id);
  console.log(user);
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
  const { email, password } = req.body;
  console.log(req.body);

  const user = await UserModel.findOne({ email: email });
  console.log(user);
  if (!user) {
    return res.status(409).json({ error: "Invalid credentials" });
  }

  const verifyPassword = await user.comparePassword(password);

  if (!verifyPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email, password }, process.env.JWT_TOKEN_KEY);
  return res.status(200).json({
    message: "Authenticated User",
    token,
  });
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
