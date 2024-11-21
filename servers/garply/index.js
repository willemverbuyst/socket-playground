const express = require("express");
const { createServer } = require("node:http");
const db = require("./database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = createServer(app);
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Clients to send SSE data
const clients = [];
let clientId = 0;

// SSE Endpoint
app.get("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const id = ++clientId;
  clients.push({ id, res });

  // Send an initial message
  res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);

  const result = await db.query("SELECT * FROM data ORDER BY id ASC LIMIT 5");

  res.write(
    `data: ${JSON.stringify({
      message: "garply data",
      data: result.rows,
    })}\n\n`
  );

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

server.listen(8086, () => {
  console.log("Garply - NodeJS server - running on http://localhost:8086");
});
