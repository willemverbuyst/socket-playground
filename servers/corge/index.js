const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

function generateFakeValue() {
  const value = Math.round(Math.random() * 100, 2);
  return value;
}

io.on("connect", (socket) => {
  console.log(`Client ${socket.id} connected`);
  const int = setInterval(() => io.emit("corge", generateFakeValue()), 2500);

  socket.on("pre-disconnect", (id) => {
    console.log(`Client ${id} disconnecting`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected`);
    clearInterval(int);
  });
});

server.listen(8085, () => {
  console.log("Corge - NodeJS server - running on http://localhost:8085");
});
