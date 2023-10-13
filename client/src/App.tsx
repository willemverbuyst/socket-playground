import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("roger", (value) => console.log(value));

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello world</h1>
      <p>{`App is ${isConnected ? "connected" : "not connected"}`}</p>
    </div>
  );
}
