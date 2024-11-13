import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

const io = new Server({
  cors: {
    origin: ["http://localhost:5173"],
  },
});

function generateFakeValue() {
  const value = Math.round(Math.random() * 100);
  return value;
}

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);
  const int = setInterval(
    () => io.emit("denoserver", generateFakeValue()),
    1000
  );

  socket.on("pre-disconnect", (id) => {
    console.log(`Client ${id} disconnecting`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
    clearInterval(int);
  });
});

await serve(io.handler(), {
  port: 8083,
});
