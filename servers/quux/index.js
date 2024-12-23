const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
app.use(express.json());

function generateFakeValue() {
  const value = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  return value;
}

io.on("connect", (socket) => {
  console.log(`Client ${socket.id} connected`);
  const int = setInterval(() => io.emit("quux", generateFakeValue()), 1000);

  socket.on("pre-disconnect", (id) => {
    console.log(`Client ${id} disconnecting`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected`);
    clearInterval(int);
  });
});

server.listen(8081, () => {
  console.log("Quux - NodeJS server - running on http://localhost:8081");
});
