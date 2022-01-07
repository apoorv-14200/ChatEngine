const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship",
      },
    ],
  },
  { timestamps: true }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fpath = path.join(__dirname, "..", AVATAR_PATH).replace(/\\/g, "/");
    fpath = path.normalize(fpath);
    cb(null, fpath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

//static functions for all users
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;
console.log("PATH", userSchema.statics.avatarPath);

const User = mongoose.model("User", userSchema);

module.exports = User;
