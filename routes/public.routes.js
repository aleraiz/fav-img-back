const { Router } = require("express");
const publicRoutes = Router();

const ImageModel = require("../models/image.model");

const { signUp, login } = require("../controllers/userController");

publicRoutes.get("/", async (req, res) => {
  try {
    const images = await ImageModel.find();
    console.log(images);
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
});

publicRoutes.post("/signup", signUp);
publicRoutes.post("/login", login);

module.exports = publicRoutes;
