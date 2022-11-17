const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SEC, { expiresIn: "3d" });
};
module.exports = {
  //logi a user
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.status(201).json({ email: user.email, token: token });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ msg: "email already rejistered" });
      }
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
  // sign up a user
  signupUser: async (req, res) => {
    const { email, password, phone, user_name } = req.body;

    try {
      if (!email || !password || !phone || !user_name) {
        throw Error("all feilds must be filled");
      }
      if (!validator.isEmail(email)) {
        throw Error("please enter a valid email");
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await User.create({
        email,
        password: hash,
        phone,
        user_name,
      });
      const token = createToken(user._id);
      res
        .status(201)
        .json({ user_name: user.user_name, email: user.email, token: token });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "email already exist" });
      }
      console.log(error);
      if (error.message.includes("MongooseServerSelectionError")) {
        res.status(500).json({
          error:
            "could not connect to the server check your inernet connection",
        });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  },
};
