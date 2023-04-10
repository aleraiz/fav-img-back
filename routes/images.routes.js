const { Router } = require("express");
const routes = Router();
const {
  storeImage,
  deleteImage,
  updateImage,
  viewImage,
} = require("../controllers/imageController");

routes.get("/image/:id", viewImage);

routes.post("/image/create", storeImage);

routes.put("/image/edit/:id", updateImage);

routes.delete("/image/delete/:id", deleteImage);

module.exports = routes;
