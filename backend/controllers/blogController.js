const { isValidObjectId } = require("mongoose");
const User = require("../models/userModel");
const Blog = require("../models/blogModel");
module.exports = {
  // create blog
  createBlog: async (req, res) => {
    const user_id = req.user._id;
    const { title, body, snippet } = req.body;
    try {
      const userObj = await User.findById(user_id);
      const userName = userObj.user_name;
      const blog = await Blog.create({
        title,
        snippet,
        body,
        user_id,
        owner: userName,
      });
      res.status(201).json(blog);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  // get all blogs
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({}).sort({ createdAt: -1 });
      res.status(200).json(blogs);
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        return res.status(500).json({ error: "server error" });
      }
    }
  },
  //get user blogs
  getUserblog: async (req, res) => {
    const user_id = req.user._id;

    const blogs = await Blog.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  },
  //get single blog
  getOneblog: async (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      const singleBlog = await Blog.findById(id);
      if (!singleBlog) {
        return res.status(404).json({ error: "no such a blog" });
      }
      res.status(200).json(singleBlog);
    } else {
      res.status(404).json({ error: "not a valid blog id" });
    }
  },
  //delete a blog
  deleteBlog: async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const result = await Blog.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: "no blog found to delete" });
      }
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "not a valid id" });
    }
  },

  //update a blog
  updateBlog: async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const result = await Blog.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );
      if (!result) {
        return res.status(404).json({ error: "no blog found to update" });
      }
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "not a valid id" });
    }
  },
  //add like
  addLike: async (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      try {
        const likeEmail = req.body.email;
        const isLiked = await Blog.findOne({ _id: id });

        if (isLiked.likes.includes(likeEmail)) {
          console.log(isLiked.likes.includes(likeEmail));

          const newLikes = isLiked.likes.filter((el) => el !== likeEmail);

          const result = await Blog.findOneAndUpdate(
            { _id: id },
            { $set: { likes : newLikes } }
          );
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(400).json({ error: result });
          }
        } else {
          const result = await Blog.findOneAndUpdate(
            { _id: id },
            { $push: { likes: likeEmail } }
          );

          if (!result) {
            return res.status(404).json({ error: "no blog found to like" });
          }

          res.status(200).json(result);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(404).json({ error: "not a valid id" });
    }
  },
};
