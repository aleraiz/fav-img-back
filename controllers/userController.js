const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const seeProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id).populate("images");
    console.log(id);
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const signUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(409).json("passwords do not match");
  }

  //Ver si tengo que chequear aca si ya existe ese usuario o email en la BD o si cuando intenta crearlo, como en el modelo ya dice q es unico tira el error con el keyValue q dice q ya existe ese usuario o mail.
  try {
    const emailExist = await UserModel.findOne({ email: email });
    const userNameExist = await UserModel.findOne({ username: username });
    console.log({ emailExist });
    console.log({ userNameExist });

    if (emailExist) {
      return res.status(409).json("The email is already registered");
    } else if (userNameExist) {
      return res.status(409).json("Username is not available");
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const user = new UserModel({
      username,
      email,
      passwordHash: password,
    });
    user.passwordHash = await user.encryptPassword(password);
    const savedUser = await user.save();
    console.log(savedUser);

    res.status(201).json({
      message: "User successfully registered",
      savedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(409).json(error);
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { firstname, lastname, username, email } = req.body;

  console.log(req.body);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      username,
      email,
    });

    res.status(201).json({
      message: "User successfully updated",
      updatedUser,
    });
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

  const userForToken = {
    id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.JWT_TOKEN_KEY);
  return res.status(200).json({
    message: "Authenticated User",
    email: user.email,
    username: user.username,
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
