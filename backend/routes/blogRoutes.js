const express = require("express");
const {
  createBlog,
  getOneblog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getUserblog,
  addLike,
  addComment,
} = require("../controllers/blogController");
const router = express.Router();
const requireAuth = require("../middelware/requireAuth");
const bodyParser = require("body-parser");
//middleware
router.use(requireAuth);
//get all blogs

router.get("/", getBlogs);
//get user blog
router.get("/userBlogs", getUserblog);
//get single blog
router.get("/:id", getOneblog);

//delete single workout
router.delete("/:id", deleteBlog);
//add like
router.patch("/addlike/:id", addLike);
//post single blog
router.post("/", createBlog);
//add comment
router.patch("/:id", addComment);
//update single blog
// router.patch("/:id", updateBlog);
module.exports = router;
