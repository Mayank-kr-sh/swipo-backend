const Product = require("../../models/Product");

const GetProductList = async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json({
      status: "true",
      message: "Product List Fetched Successfully",
      data: productList,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Check if all required fields are provided
    if (!name || !description || !price || !image) {
      return res.status(400).json({
        status: "false",
        message: "All fields (name, description, price, image) are required",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      status: "true",
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { GetProductList, AddProduct };
