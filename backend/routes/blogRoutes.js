const express = require("express");
const {
  createBlog,
  getOneblog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getUserblog,
  addLike,
} = require("../controllers/blogController");
const router = express.Router();
const requireAuth = require("../middelware/requireAuth");
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

//update single blog
router.patch("/:id", updateBlog);
module.exports = router;
