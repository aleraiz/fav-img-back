const { Router } = require("express");
const imageRoutes = Router();
const { expressjwt: checkJwt } = require("express-jwt");
const {
  storeImage,
  deleteImage,
  updateImage,
  viewImage,
} = require("../controllers/imageController");

imageRoutes.use(
  checkJwt({ secret: process.env.JWT_TOKEN_KEY, algorithms: ["HS256"] })
);

imageRoutes.get("/image/:id", viewImage);

imageRoutes.post("/image/create", storeImage);

imageRoutes.put("/image/edit/:id", updateImage);

imageRoutes.delete("/image/delete/:id", deleteImage);

module.exports = imageRoutes;
