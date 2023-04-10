const { Router } = require("express");
const routes = Router();
const {
  seeProfile,
  signUp,
  editUser,
  deleteUser,
  login,
  logout,
} = require("../controllers/userController");

routes.get("/", (req, res) => {
  console.log("ok");
  res.send("home");
});

routes.get("/user/:id", seeProfile);

routes.post("/user/signup", signUp);

routes.put("/user/edit/:id", editUser);

routes.delete("/user/delete/:id", deleteUser);

routes.post("/user/login", login);
routes.get("/user/logout", logout);

module.exports = routes;
