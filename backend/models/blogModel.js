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
    owner: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", BlogSchema);
module.exports = Blog;
