import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { socket3 as socket } from "./socket";

export default function Grault() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);

  const [fooBarData, setFooBarData] = useState<number[]>([]);

  useEffect(() => {
    function onConnect() {
      setSocketIsConnected(true);
    }

    function onDisconnect() {
      setSocketIsConnected(false);
    }

    function handleFooBar(value: number) {
      setFooBarData((prev) => {
        const newFooBar =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newFooBar;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("grault", handleFooBar);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("grault", handleFooBar);
    };
  }, []);

  return (
    <section>
      <p>{`Python Server ${socketIsConnected ? "✅" : "❎"}`}</p>
      <section
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        <BarChart
          width={300}
          height={100}
          data={fooBarData.map((i) => ({ v: i }))}
        >
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="v" fill="#4400ff" />
        </BarChart>
      </section>
    </section>
  );
}
