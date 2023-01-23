const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  likes: { type: Number, default: 15 },
  description: { type: String, required: true },
  PostImage: { type: String, required: true },
  date: { type: String },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
