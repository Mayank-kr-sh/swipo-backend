const express = require("express");
const {
  GetProductList,
  AddProduct,
} = require("../controller/ProductController/productController");

const router = express.Router();

router.get("/list", GetProductList);
router.post("/add", AddProduct);

module.exports = router;
