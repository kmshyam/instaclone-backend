const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const post = require("./Model/post");
const connect = require("./Connection/connect");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("cloudinary").v2;

if (typeof process.env.CLOUDINARY_URL === "undefined") {
  console.warn("!! cloudinary config is undefined !!");
  console.warn("export CLOUDINARY_URL or set dotenv file");
} else {
  console.log("cloudinary config:");
  console.log(cloudinary.config());
}
console.log(
  "-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --"
);

connect();

app.get("/user", async (req, res) => {
  try {
    const userList = await post.find().sort({ _id: -1 });
    res.json({
      status: "success",
      userList,
    });
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/newuserpost", upload.single("PostImage"), async (req, res) => {
  try {
    const cloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "InstacloneUserPost",
    });
    const newUserPost = await post.create({
      ...req.body,
      PostImage: cloud.url,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    });
    res.json({
      status: "success",
      newUserPost,
    });
  } catch (e) {
    res.send(e.message);
  }
});

app.listen(8081, () => {
  console.log("server is up at port 8081");
});
