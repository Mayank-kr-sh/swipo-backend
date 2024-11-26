const upload = require("../../middlewares/fileUpload");

const uploadImage = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "File size exceeds the 200KB limit." });
        }
      }
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    res.json({ imageUrl: req.file.path });
  });
};

module.exports = { uploadImage };
