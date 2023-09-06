const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const blogRouter = require("./routes/blogRoutes");
const userRoutes = require("./routes/user");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//middelware
app.use(
  cors({
    origin: ["https://blog-react-new.onrender.com"],
  })
);
app.use(express.json());
app.use("/public", express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.use("/api/blogs/", blogRouter);
app.use("/api/user/", userRoutes);
//connect to db
mongoose
  .connect(process.env.DBURI2)
  .then(() => {
    //starting the server
    app.listen(process.env.PORT, () => {
      console.log("connected to db && listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
