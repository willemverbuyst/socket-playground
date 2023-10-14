import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import Button from "./components/Button";
import Wrapper from "./components/Wrapper";
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
    <Wrapper>
      <section className="flex w-96 justify-between p-4 py-5">
        <p className="text-xl">{`NodeJS Server 1 ${
          socketIsConnected ? "✅" : "❎"
        }`}</p>
        {socketIsConnected ? (
          <Button clickHandler={disconnect} caption="Disconnect" />
        ) : (
          <Button clickHandler={connect} caption="Connect" />
        )}
      </section>
      <section className="flex flex-col">
        <BarChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="v" fill="#00ff44" isAnimationActive={false} />
        </BarChart>
      </section>
    </Wrapper>
  );
}
