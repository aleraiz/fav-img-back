const express = require("express");
const routes = express.Router();
const userController = require("../controllers/userController");

routes.get("/", (req, res) => {
  console.log("ok");
  res.send("home");
});

routes.get("/id", userController.seeProfile);

routes.post("/create", userController.createUser);

routes.put("/editUser/:id", userController.editUser);

routes.delete("/delete/:id", userController.deleteUser);

module.exports = routes;
