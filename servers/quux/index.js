const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const db = require("./database");

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

app.post("/data", async (req, res) => {
  const { fuga, foo, bar } = req.body;

  if (!fuga || !foo || !bar) {
    res.status(422).send("Missing params");
  } else {
    try {
      const result = await db.query(
        "INSERT INTO data (fuga, foo, bar) VALUES ($1, $2, $3) RETURNING *",
        [fuga, foo, bar]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

app.get("/data", async (_req, res) => {
  try {
    const result = await db.query("SELECT * FROM data ORDER BY id ASC");
    res.json(result.rows); // Send all records as JSON
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/data", async (_req, res) => {
  try {
    await db.query("DELETE FROM data");
    res.send("All records deleted successfully");
  } catch (err) {
    console.error("Error clearing data:", err);
    res.status(500).send("Internal Server Error");
  }
});

server.listen(8081, () => {
  console.log("Quux - NodeJS server - running on http://localhost:8081");
});
