import { useEffect, useState } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts";
import { socket3 as socket } from "./socket";

export default function Grault() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const [data, setData] = useState<number[]>([]);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.emit("pre-disconnect", socket.id);
    socket.disconnect();
  }

  useEffect(() => {
    function connect() {
      setSocketIsConnected(true);
    }

    function disConnect() {
      setSocketIsConnected(false);
    }

    function handleGrault(value: number) {
      setData((prev) => {
        const newFooBar =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newFooBar;
      });
    }

    socket.connect();

    socket.on("connect", connect);
    socket.on("disconnect", disConnect);
    socket.on("grault", handleGrault);

    return () => {
      socket.off("connect", connect);
      socket.off("disonnect", disconnect);
      socket.off("grault", handleGrault);
    };
  }, []);

  const parseDomain = () => [0, Math.max.apply(null, data)];

  const domain = parseDomain();

  return (
    <section className="flex flex-col items-center pb-10 border border-slate-300 w-96">
      <section className="flex w-96 justify-between p-4 py-5">
        <p className="text-xl">{`Python Server ${
          socketIsConnected ? "✅" : "❎"
        }`}</p>
        {socketIsConnected ? (
          <button
            className="border border-slate-300 text-sm text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            onClick={disconnect}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="border border-slate-300 text-sm text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            onClick={connect}
          >
            Connect
          </button>
        )}
      </section>
      <section className="flex flex-col">
        <ScatterChart
          width={300}
          height={50}
          margin={{ top: 10, right: 0, bottom: -10, left: 0 }}
        >
          <ZAxis type="number" dataKey="x" domain={domain} range={[0, 200]} />
          <XAxis dataKey="x" hide={true} />
          <YAxis dataKey="y" hide={true} />
          <Scatter data={data.map((i) => ({ x: i, y: 1 }))} fill="#00ffff" />
        </ScatterChart>
        <ScatterChart
          width={300}
          height={50}
          margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
        >
          <ZAxis type="number" dataKey="x" domain={domain} range={[0, 200]} />
          <XAxis dataKey="x" hide={true} />
          <YAxis dataKey="y" hide={true} />
          <Scatter
            data={data.reverse().map((i) => ({ x: i, y: 1 }))}
            fill="#ff007f"
          />
        </ScatterChart>
      </section>
    </section>
  );
}
