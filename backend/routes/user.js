const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const express = require("express");
const {
  loginUser,
  signupUser,

  updateImg,
} = require("../controllers/userController");

const router = express.Router();

// login
router.post("/login", loginUser);
// signup
router.post("/signup", signupUser);

router.patch("/updateimg/:username", updateImg);
// router.post("/addAvatar", addAvatar)
module.exports = router;
