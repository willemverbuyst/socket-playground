import { useEffect, useState } from "react";
import { socket4 as socket } from "./socket";
import { truncateString } from "./utils";

type LoremProps = {
  notify: (value: string) => void;
};

export default function Lorem({ notify }: LoremProps) {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const [data, setData] = useState<string[]>([]);

  function connect() {
    setSocketIsConnected(true);
    socket.connect();
  }

  function disconnect() {
    setSocketIsConnected(false);
    socket.emit("pre-disconnect", socket.id);
    socket.disconnect();
  }

  useEffect(() => {
    function handleLorem(value: string) {
      setData((prev) => {
        const newLorem =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newLorem;
      });
    }

    function handleIpsum(value: string) {
      notify(`[NodeJS Server 3]: ${value}`);
    }

    socket.on("lorem", handleLorem);
    socket.on("ipsum", handleIpsum);

    return () => {
      socket.off("lorem", handleLorem);
      socket.off("ipsum", handleIpsum);
    };
  }, [notify]);

  return (
    <section className="flex flex-col items-center pb-10 ">
      <section className="flex w-96 justify-between py-5">
        <p className="text-xl">{`NodeJS Server 3 ${
          socketIsConnected ? "✅" : "❎"
        }`}</p>
        {socketIsConnected ? (
          <button
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            onClick={disconnect}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            onClick={connect}
          >
            Connect
          </button>
        )}
      </section>
      <section className="flex flex-col items-center">
        {data.length > 0 && <p>{truncateString(data.join(" "), 40)}</p>}
      </section>
    </section>
  );
}
