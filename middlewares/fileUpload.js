const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Swipo",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 200 * 1024,
  // },
}).single("image");

module.exports = upload;
