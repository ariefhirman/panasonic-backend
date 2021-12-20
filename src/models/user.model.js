const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    appKey: String,
    contact: String
  })
);

module.exports = User;