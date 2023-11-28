import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { socket1 as socket } from "../config/socket";
import useFooBarData from "../hooks/useFooBarData";
import Button from "./Button";
import Wrapper from "./Wrapper";

export default function FooBar() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const { fooBarData, setFooBarData } = useFooBarData();

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

    socket.connect();

    socket.on("connect", connect);
    socket.on("disconnect", disConnect);
    socket.on("fooBar", setFooBarData);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      socket.off("fooBar", setFooBarData);
    };
  }, [setFooBarData]);

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
        <BarChart
          width={300}
          height={100}
          data={fooBarData.map((i) => ({ v: i }))}
        >
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="v" fill="#00ff44" isAnimationActive={false} />
        </BarChart>
      </section>
    </Wrapper>
  );
}
