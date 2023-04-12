const { Schema, model } = require("mongoose");

const imagesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    srcImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ImageModel = model("images", imagesSchema);

module.exports = ImageModel;
