const images = require("../models/images.model");
const cloudinary = require("../libs/configCloudinary");
const fs = require("fs-extra");

const postImage = async (req, res, next) => {
  const pathFile = req.file.path;
  const { title, position } = req.body;

  try {
    const result = await cloudinary.uploader.upload(pathFile);
    const newPhoto = new images({
      title,
      position,
      imageURL: result.secure_url,
      public_id: result.public_id,
    });

    if (req.file) {
      await fs.unlink(req.file.path);
    }

    await newPhoto.save();
    res.status(200).json({
      message: "Photo uploaded successfully",
      photo: newPhoto,
    });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

const getAllImages = async (req, res, next) => {
  try {
    const img = await images.find({});
    res.status(200).json({ items: img.length, images: img });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

module.exports = {
  postImage,
  getAllImages,
};
