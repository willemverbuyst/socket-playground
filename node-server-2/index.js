const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

app.get("/", (req, res) => {
  res.send("<h1>Node Server 2</h1>");
});

function generateFakeValue() {
  return Math.floor(Math.random() * (80 - 20 + 1)) + 20;
}

io.on("connect", (socket) => {
  setInterval(() => io.emit("quux", generateFakeValue()), 1000);
});

server.listen(8081, () => {
  console.log("node server 2 running at http://localhost:8081");
});
