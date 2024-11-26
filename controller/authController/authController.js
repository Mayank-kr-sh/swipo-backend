const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userRegister = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email already exists..." });
    }

    const mobileExist = await User.findOne({ mobile });

    if (mobileExist) {
      return res
        .status(400)
        .json({ message: "Mobile number already exists..." });
    }

    if (req.file && req.file.size > 200 * 1024) {
      return res
        .status(400)
        .json({ message: "File size exceeds the 200KB limit." });
    }

    const imageUrl = req.file ? req.file.path : null;

    const user = new User({
      name,
      email,
      password,
      mobile,
      avatar: imageUrl,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.token = token;

    await user.save();

    return res
      .status(200)
      .json({ message: "User registered successfully...", user });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error...." });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Provied valid email address" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match.." });
    }

    return res
      .status(200)
      .json({ message: "User logged in successfully...", user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error...." });
  }
};
module.exports = { userRegister, userLogin };
