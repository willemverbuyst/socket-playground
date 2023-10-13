import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import "./App.css";
import { socket2 as socket } from "./socket";

export default function Quux() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);

  const [quuxData, setQuuxData] = useState<number[]>([]);

  useEffect(() => {
    function onConnect2() {
      setSocketIsConnected(true);
    }

    function onDisconnect2() {
      setSocketIsConnected(false);
    }

    function handleQuux(value: number) {
      setQuuxData((prev) => {
        const newQuux =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newQuux;
      });
    }

    socket.on("connect", onConnect2);
    socket.on("disconnect", onDisconnect2);
    socket.on("quux", handleQuux);

    return () => {
      socket.off("connect", onConnect2);
      socket.off("disconnect", onDisconnect2);
      socket.off("quux", handleQuux);
    };
  }, []);

  return (
    <section>
      <p>{`NodeJS Server 2 ${socketIsConnected ? "✅" : "❎"}`}</p>
      <section
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        <BarChart
          width={300}
          height={100}
          data={quuxData.map((i) => ({ v: i }))}
        >
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="v" fill="#ff0044" />
        </BarChart>
      </section>
    </section>
  );
}
