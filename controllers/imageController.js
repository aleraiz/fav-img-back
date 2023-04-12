const ImageModel = require("../models/image.model");
const UserModel = require("../models/user.model");

const storeImage = async (req, res) => {
  // console.log(req.body);
  console.log(req.auth);

  const userId = req.auth.id;

  const { title, srcImage } = req.body;

  const image = new ImageModel({
    title,
    srcImage,
  });
  try {
    const savedImage = await image.save();
    await UserModel.updateOne(
      { _id: userId },
      { $push: { images: image._id } }
    );
    res.status(201).json(savedImage);
  } catch (error) {
    console.log(error);
    return res.status(409).json(error);
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deletedImage = await ImageModel.findByIdAndDelete(id);
    res.status(200).json(deletedImage);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

const updateImage = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { title, srcImage } = req.body;

  try {
    const updatedImage = await ImageModel.findByIdAndUpdate(id, {
      title,
      srcImage,
    });
    res.status(200).json(updatedImage);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

const viewImage = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const image = await ImageModel.findById(id);
    console.log(image);
    res.status(200).json(image);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

module.exports = {
  storeImage,
  deleteImage,
  updateImage,
  viewImage,
};
