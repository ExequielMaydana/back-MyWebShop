const product = require("../models/products.model");
const cloudinary = require("../libs/configCloudinary");
const fs = require("fs-extra");

const postProduct = async (req, res, next) => {
  try {
    const { images, ...productData } = req.body;

    const imageArray = [];

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        const imageUrl = result.secure_url;
        const publicId = result.public_id;
        imageArray.push({ imageUrl, publicId });
        await fs.unlink(file.path);
      }
    }

    const newProduct = new product({
      ...productData,
      images: imageArray,
    });

    await newProduct.save();
    res.status(201).json({
      message: "The product was successfully created",
      product: newProduct,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al crear el producto", details: error.message });
    next();
  }
};

// mostrar todos los productos
const getAllProduct = async (req, res, next) => {
  const products = await product
    .find({})
    .populate({ path: "images", select: "imageURL -_id" })
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "brand", select: "name -_id" });
  try {
    res.status(200).json({ items: products.length, products: products });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

// mostrar un producto por ID
const getProductById = async (req, res, next) => {
  const idProduct = req.params.id;
  const productById = await product
    .findById(idProduct)
    .populate({ path: "images", select: "imageURL -_id" })
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "brand", select: "name -_id" });
  if (!productById) {
    res
      .status(400)
      .json({ message: `Product with id ${idProduct} does not exist` });
    return next();
  }

  res.status(200).json(productById);
};

const updateProduct = async (req, res, next) => {
  const idProduct = req.params.id;
  const newDataProduct = req.body;

  try {
    // traemos el producto antes de actualizarlo
    const productPrevious = await product.findById({ _id: idProduct });

    if (req.file) {
      // si existe una imagen nueva.
      newDataProduct.img = req.file.filename;
    } else {
      // sino deja la que estaba
      newDataProduct.img = productPrevious.img;
    }

    const productoAfter = await product.findOneAndUpdate(
      { _id: idProduct },
      newDataProduct,
      { new: true }
    );
    res.status(200).json({
      message: "Product was successfully modified",
      product: productoAfter,
    });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await product.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json();
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

const getProductByParam = async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.product_type) {
      filters.product_type = req.query.product_type;
    }

    if (req.query.brand) {
      filters.brand = req.query.brand;
    }

    const productFound = await product.find(filters);

    if (!productFound || productFound.length === 0) {
      return res.status(404).json({
        message: `No products found with the specified filters`,
      });
    }

    if (!productFound) {
      res.status(404).json({
        message: `The product with the category ${req.query.category} does not exist`,
      });
      return;
    }
    res
      .status(200)
      .json({ items: productFound.length, products: productFound });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

const searchProductByName = async (req, res, next) => {
  const { name } = req.query;

  try {
    const productFound = await product.find({
      name: { $regex: new RegExp(name, "i") },
    });

    res.status(200).json(productFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar productos por nombre" });
  }
};
module.exports = {
  postProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByParam,
  searchProductByName,
};
