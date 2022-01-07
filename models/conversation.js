const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    friendship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friendship",
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
