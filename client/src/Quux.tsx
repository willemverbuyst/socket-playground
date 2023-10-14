import { useEffect, useState } from "react";
import { Area, AreaChart, YAxis } from "recharts";
import { socket2 as socket } from "./socket";

export default function Quux() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);

  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    function onConnect() {
      setSocketIsConnected(true);
    }

    function onDisconnect() {
      setSocketIsConnected(false);
    }

    function handleQuux(value: number) {
      setData((prev) => {
        const newQuux =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newQuux;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("quux", handleQuux);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("quux", handleQuux);
    };
  }, []);

  return (
    <section className="flex flex-col items-center py-10">
      <p className="text-xl py-5">{`NodeJS Server 2 ${
        socketIsConnected ? "✅" : "❎"
      }`}</p>
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
