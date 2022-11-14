const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      unique: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", BlogSchema);
module.exports = Blog;
