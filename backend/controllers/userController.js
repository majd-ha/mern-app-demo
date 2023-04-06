const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");

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

      res.status(201).json({
        email: user.email,
        token: token,
        user_name: user.user_name,
        avatar: { avatar: user.avatar },
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ msg: "email already registered" });
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
        avatar: fs.readFileSync(`uploads\\a302008d965086ab4e869cde72d47721`),
        password: hash,
        phone,
        user_name,
      });
      const token = createToken(user._id);

      res.status(201).json({
        user_name: user.user_name,
        email: user.email,
        token: token,
        avatar: { avatar: user.avatar },
      });
    } catch (error) {
      if (error.code === 11000) {
        console.log(Object.keys(error.keyPattern));
        Object.keys(error.keyPattern).map((el) => {
          if (el === "user_name") {
            errMsg = "this user name is already taken ";
          }
          if (el === "phone") {
            errMsg = "this Phone number is already used";
          }
          if (el === "email") {
            errMsg = "this Email is already used ";
          }
        });
        return res.status(400).json({ error: errMsg });
      }
      console.log(error);
      if (error.message.includes("MongooseServerSelectionError")) {
        res.status(500).json({
          error:
            "could not connect to the server check your internet connection",
        });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  },
  updateImg: async (req, res) => {
    const avatar = req.file;

    const username = req.params.username;
    const result = await User.findOneAndUpdate(
      { user_name: username },
      { $set: { avatar: fs.readFileSync(`uploads\\${avatar.filename}`) } },
      { new: true }
    );

    if (result) {
      const updateBlogs = await Blog.updateMany(
        { owner: username },
        { $set: { owner_avatar: result.avatar } }
      );
      res.status(201).json({ avatar: result.avatar, updated: updateBlogs });
      fs.unlinkSync(`uploads\\${avatar.filename}`);
    } else {
      res.status(400).json({ error: result });
    }
  },
};
