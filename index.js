const express = require("express");
const app = express();
const Like = require("./models/like");
const Post = require("./models/post");
const Comment = require("./models/comment");
const Friendship = require("./models/friendship");
const User = require("./models/user");
const Conversation = require("./models/conversation");
const Message = require("./models/message");

const db = require("./config/mongoose");

const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Running");
});

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "http://powerful-hamlet-85569.herokuapp.com",
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// }).listen(socket_port);

io.on("connection", function (socket) {
  console.log(socket.id);
  socket.on("make-user-online", async (user) => {
    const cur = await User.findById(user._id);
    if (cur) {
      cur.online = true;
      cur.socket_id = socket.id;
      cur.save();
      console.log(cur);
      io.emit("user-onlined");
    }
    // console.log("User Onlined", user);
  });
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  socket.on("leave_room", (room) => {
    socket.leave(room);
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
  socket.on("make-user-offline", async (user) => {
    const cur = await User.findById(user._id);
    if (cur) {
      cur.online = false;
      cur.save();
      console.log(cur);
      io.emit("user-offlined");
    }
    // console.log("User Offlined", user);
  });
  socket.on("disconnect", async () => {
    const cur = await User.findOne({ socket_id: socket.id });
    if (cur) {
      cur.online = false;
      cur.save();
      io.emit("user-offlined");
    }
    // console.log("diconnected user", cur);
    // console.log("Socket disconnected");
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
