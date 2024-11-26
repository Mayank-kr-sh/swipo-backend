const express = require("express");
const { uploadImage } = require("../controller/upload/uploadController");
const router = express.Router();

router.post("/upload", uploadImage);

module.exports = router;
