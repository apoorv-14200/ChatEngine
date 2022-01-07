const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const passportjwt = require("./config/passport-jwt-strategy");
const app = express();
const Like = require("./models/like");
const Post = require("./models/post");
const Comment = require("./models/comment");
const Friendship = require("./models/friendship");
const User = require("./models/user");
const Conversation = require("./models/conversation");
const Message = require("./models/message");

const db = require("./config/mongoose");

let socket_port = process.env.SOCKET;
if (socket_port == "" || socket_port == null) {
  socket_port = 8000;
}

app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
}).listen(socket_port);

io.on("connection", function (socket) {
  console.log(socket.id);
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  socket.on("send-message", async function (message, roomid) {
    console.log(message, roomid);
    let conv = await Conversation.findOne({ friendship: roomid });
    let newmsg = await Message.create({
      user: message.user._id,
      content: message.content,
    });
    conv.messages.push(newmsg);
    conv.save();
    io.to(roomid).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
