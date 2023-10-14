import { useEffect, useState } from "react";
import { socket4 as socket } from "./socket";
import { truncateString } from "./utils";

export default function Lorem() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setSocketIsConnected(true);
    }

    function onDisconnect() {
      setSocketIsConnected(false);
    }

    function handleFooBar(value: string) {
      setData((prev) => {
        const newLorem =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newLorem;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("lorem", handleFooBar);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("lorem", handleFooBar);
    };
  }, []);

  return (
    <section className="flex flex-col items-center py-10">
      <p className="text-xl py-5">{`NodeJS Server 3 ${
        socketIsConnected ? "✅" : "❎"
      }`}</p>

      <section className="flex flex-col items-center">
        {data.length > 0 && <p>{truncateString(data.join(" "), 40)}</p>}
      </section>
    </section>
  );
}
