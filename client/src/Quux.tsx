import { useEffect, useState } from "react";
import { Area, AreaChart, YAxis } from "recharts";
import { socket2 as socket } from "./socket";

export default function Quux() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const [data, setData] = useState<number[]>([]);

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
    function handleQuux(value: number) {
      setData((prev) => {
        const newQuux =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newQuux;
      });
    }

    socket.on("quux", handleQuux);

    return () => {
      socket.off("quux", handleQuux);
    };
  }, []);

  return (
    <section className="flex flex-col items-center pb-10 ">
      <section className="flex w-96 justify-between py-5">
        <p className="text-xl">{`NodeJS Server 2 ${
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
      <section className="flex flex-col">
        <AreaChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
          <YAxis type="number" domain={[0, 100]} hide />
          <Area
            type="monotone"
            dataKey="v"
            fill="#ff0044"
            isAnimationActive={false}
            dot={false}
          />
        </AreaChart>
      </section>
    </section>
  );
}
