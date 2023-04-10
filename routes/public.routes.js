const { Router } = require("express");
const publicRoutes = Router();

const { signUp, login } = require("../controllers/userController");

publicRoutes.get("/", (req, res) => {
  console.log("ok");
  res.send("home");
});

publicRoutes.post("/signup", signUp);
publicRoutes.post("/login", login);

module.exports = publicRoutes;
