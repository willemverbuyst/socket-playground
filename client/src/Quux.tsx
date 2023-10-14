import { useEffect, useState } from "react";
import { Area, AreaChart, YAxis } from "recharts";
import Button from "./components/Button";
import Wrapper from "./components/Wrapper";
import { socket2 as socket } from "./socket";

export default function Quux() {
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

    function handleQuux(value: number) {
      setData((prev) => {
        const newQuux =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newQuux;
      });
    }

    socket.connect();

    socket.on("connect", connect);
    socket.on("disconnect", disConnect);
    socket.on("quux", handleQuux);

    return () => {
      socket.off("connect", connect);
      socket.off("disonnect", disconnect);
      socket.off("quux", handleQuux);
    };
  }, []);

  return (
    <Wrapper>
      <section className="flex w-96 justify-between p-4 py-5">
        <p className="text-xl">{`NodeJS Server 2 ${
          socketIsConnected ? "✅" : "❎"
        }`}</p>
        {socketIsConnected ? (
          <Button clickHandler={disconnect} caption="Disconnect" />
        ) : (
          <Button clickHandler={connect} caption="Connect" />
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
    </Wrapper>
  );
}
