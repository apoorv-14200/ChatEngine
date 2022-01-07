const mongoose = require("mongoose");

const FriendshipSchema = new mongoose.Schema(
  {
    from_user: {
      type: mongoose.Schema.Types.ObjectId, //we identify the user whoh post the post by their id
      ref: "User", //refrences to User schema
    },
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Friendship", FriendshipSchema);

module.exports = Friendship;
