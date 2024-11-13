import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type UseSocketProps = { socket: Socket };

export default function useSocket({ socket }: UseSocketProps) {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.emit("pre-disconnect", socket.id);
    socket.disconnect();
  }

  useEffect(() => {
    socket.connect();
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => setSocketIsConnected(true));
    socket.on("connection", () => setSocketIsConnected(true));
    socket.on("disconnect", () => setSocketIsConnected(false));

    return () => {
      socket.off("connect", () => setSocketIsConnected(true));
      socket.off("connection", () => setSocketIsConnected(true));
      socket.off("disconnect", () => setSocketIsConnected(false));
    };
  }, [socket]);

  return { connect, disconnect, socketIsConnected };
}
