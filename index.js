const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = http.createServer(app);
app.use(express.static(__dirname + "/public"));

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("user connected with id" + socket.id);

  socket.on("newmessage", (message, room) => {
    if (room) {
      console.log(room);
      socket.to(room).emit("servermessage", message);
      return;
    }
    io.emit("servermessage", message);
  });

  socket.on("jontheroom", (romename, callback) => {
    socket.join(romename);
    callback();
  });
});

const port = 3000;
httpServer.listen(port, () => {
  console.log("Server is running");
});
