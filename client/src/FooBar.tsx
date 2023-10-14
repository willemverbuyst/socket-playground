import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { socket1 as socket } from "./socket";

export default function FooBar() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);

  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    function onConnect1() {
      setSocketIsConnected(true);
    }

    function onDisconnect1() {
      setSocketIsConnected(false);
    }

    function handleFooBar(value: number) {
      setData((prev) => {
        const newFooBar =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newFooBar;
      });
    }

    socket.on("connect", onConnect1);
    socket.on("disconnect", onDisconnect1);
    socket.on("fooBar", handleFooBar);

    return () => {
      socket.off("connect", onConnect1);
      socket.off("disconnect", onDisconnect1);
      socket.off("fooBar", handleFooBar);
    };
  }, []);

  return (
    <section className="flex flex-col items-center py-10">
      <p className="text-xl py-5">{`NodeJS Server 1 ${
        socketIsConnected ? "✅" : "❎"
      }`}</p>
      <section
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        <BarChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="v" fill="#00ff44" isAnimationActive={false} />
        </BarChart>
      </section>
    </section>
  );
}
