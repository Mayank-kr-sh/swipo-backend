const express = require("express");
const {
  userRegister,
  userLogin,
} = require("../controller/authController/authController");
const upload = require("../middlewares/fileUpload");

const router = express.Router();

// @route POST /api/auth/register

router.post("/register", upload, userRegister);
router.post("/login", userLogin);

module.exports = router;
