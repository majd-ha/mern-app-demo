const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userschema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
});
userschema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("all feilds must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("please enter a valid email");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    const auth = await bcrypt.compare(password, exist.password);
    if (auth) {
      return exist;
    } else {
      throw Error("password is incorect");
    }
  } else {
    throw Error("email not rejstered");
  }
};
const User = mongoose.model("user", userschema);

module.exports = User;
