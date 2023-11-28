const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

app.get("/", (req, res) => {
  res.send("<h1>Node Server 1</h1>");
});

function generateFakeValue() {
  const value = Math.round(Math.random() * 100, 2);
  return value;
}

io.on("connect", (socket) => {
  console.log(`Client ${socket.id} connected`);
  const int = setInterval(() => io.emit("fooBar", generateFakeValue()), 2000);

  socket.on("pre-disconnect", (id) => {
    console.log(`Client ${id} disconnecting`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected`);
    clearInterval(int);
  });
});

server.listen(8080, () => {
  console.log("node server 1 running on http://localhost:8080");
});
