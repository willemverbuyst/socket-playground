import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { socket1 as socket } from "./socket";

type FooBarProps = {
  notify: (value: string) => void;
};

export default function FooBar({ notify }: FooBarProps) {
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

    function handleFooBar(value: number) {
      setData((prev) => {
        const newFooBar =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newFooBar;
      });

      if (value > 90) {
        notify(`[NodeJS Server 1]: ${value}, value exceeds 90`);
      }
    }

    socket.connect();

    socket.on("connect", connect);
    socket.on("disconnect", disConnect);
    socket.on("fooBar", handleFooBar);

    return () => {
      socket.off("connect", connect);
      socket.off("disonnect", disconnect);
      socket.off("fooBar", handleFooBar);
    };
  }, [notify]);

  return (
    <section className="flex flex-col items-center pb-10 border border-slate-300 w-96">
      <section className="flex w-96 justify-between p-4 py-5">
        <p className="text-xl">{`NodeJS Server 1 ${
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
        <BarChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="v" fill="#00ff44" isAnimationActive={false} />
        </BarChart>
      </section>
    </section>
  );
}
