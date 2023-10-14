const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
const lorem = new LoremIpsum();

app.get("/", (req, res) => {
  res.send("<h1>Node Server 3</h1>");
});

function generateFakeLoremValue() {
  const value = lorem.generateWords(1);
  return value;
}

function generateFakeIpsumValue() {
  const value = lorem.generateWords(4);
  return value;
}

io.on("connect", (socket) => {
  console.log(`Client ${socket.id} connected`);
  setInterval(() => io.emit("lorem", generateFakeLoremValue()), 2000);
  setInterval(() => io.emit("ipsum", generateFakeIpsumValue()), 10000);
});

server.listen(8083, () => {
  console.log("node server 1 running at http://localhost:8083");
});
