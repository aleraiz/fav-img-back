const { Router } = require("express");
const userRoutes = Router();
const { expressjwt: checkJwt } = require("express-jwt");
const {
  seeProfile,
  editUser,
  deleteUser,
  logout,
} = require("../controllers/userController");

userRoutes.use(
  checkJwt({ secret: process.env.JWT_TOKEN_KEY, algorithms: ["HS256"] })
);

userRoutes.get("/user/:id", seeProfile);

userRoutes.put("/user/edit/:id", editUser);

userRoutes.delete("/user/delete/:id", deleteUser);

userRoutes.post("/user/logout", logout);

module.exports = userRoutes;
