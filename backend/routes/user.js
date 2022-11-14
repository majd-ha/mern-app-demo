const express = require("express");
const {
  loginUser,
  signupUser,
  addAvatar,
} = require("../controllers/userController");

const router = express.Router();

// login
router.post("/login", loginUser);
// signup
router.post("/signup", signupUser);
// router.post("/addAvatar", addAvatar)
module.exports = router;
