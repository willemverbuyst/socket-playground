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
    function connect() {
      setSocketIsConnected(true);
    }

    function disconnect() {
      setSocketIsConnected(false);
    }

    socket.on("connect", connect);
    socket.on("connection", connect);
    socket.on("disconnect", disconnect);

    return () => {
      socket.off("connect", connect);
      socket.off("connection", connect);
      socket.off("disconnect", disconnect);
    };
  }, [socket]);

  return { connect, disconnect, socketIsConnected };
}
