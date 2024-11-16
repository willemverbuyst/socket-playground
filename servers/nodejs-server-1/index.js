const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

function generateFakeValue() {
  const value = Math.round(Math.random() * 100, 2);
  return value;
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Clients to send SSE data
const clients = [];
let clientId = 0;

// SSE Endpoint
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const id = ++clientId;
  clients.push({ id, res });

  // Send an initial message
  res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);

  // Remove client on disconnect
  req.on("close", () => {
    console.log(`Client ${id} disconnected.`);
    clients.splice(
      clients.findIndex((client) => client.id === id),
      1
    );
  });

  console.log(`Client ${id} connected.`);
});

const onlineUsers = [];

app.get("/auth/:username", (req, res) => {
  const { username } = req.params;

  return res.status(200).send({ isLoggedIn: onlineUsers.includes(username) });
});

// Post endpoint to send data to SSE clients
app.post("/auth/login-user", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send({ error: "username is required" });
  }

  if (onlineUsers.includes(username)) {
    console.log("user is already logged in");
  } else {
    onlineUsers.push(username);
    console.log(`Sending onlineUsers: ${onlineUsers}`);

    // Send data to all connected clients
    clients.forEach((client) => {
      client.res.write(`data: ${JSON.stringify({ onlineUsers })}\n\n`);
    });
  }

  console.log({ onlineUsers });
  res.status(200).send({ success: true });
});

app.post("/auth/logout-user", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send({ error: "username is required" });
  }

  if (!onlineUsers.includes(username)) {
    console.log("user is not logged in");
  } else {
    const index = onlineUsers.indexOf(username);
    if (index !== -1) {
      onlineUsers.splice(index, 1);
    }

    console.log(`Sending onlineUsers: ${onlineUsers}`);

    // Send data to all connected clients
    clients.forEach((client) => {
      client.res.write(`data: ${JSON.stringify({ onlineUsers })}\n\n`);
    });
  }

  console.log({ onlineUsers });
  res.status(200).send({ success: true });
});

io.on("connect", (socket) => {
  console.log(`Client ${socket.id} connected`);
  const int = setInterval(
    () => io.emit("nodejsserver1", generateFakeValue()),
    2000
  );

  socket.on("pre-disconnect", (id) => {
    console.log(`Client ${id} disconnecting`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected`);
    clearInterval(int);
  });
});

server.listen(8080, () => {
  console.log("nodejs server 1 running on http://localhost:8080");
});
