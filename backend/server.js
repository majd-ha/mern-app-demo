const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const blogRouter = require("./routes/blogRoutes");
const userRoutes = require("./routes/user");
const cors = require("cors");
const app = express();

//middelware
app.use(
  cors({
    origin: "https://blog-react-new.onrender.com",
  })
);
app.use(express.json());

//routes
app.use("/api/blogs/", blogRouter);
app.use("/api/user/", userRoutes);
//connect to db
mongoose
  .connect(process.env.DBURI)
  .then(() => {
    //starting the server
    app.listen(process.env.PORT, () => {
      console.log("connected to db && listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
