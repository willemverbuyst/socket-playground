import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { socket1 as socket } from "../config/socket";
import useFooBarData from "../hooks/useFooBarData";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Header from "./Header.tsx";

function Chart() {
  const { fooBarData, setFooBarData } = useFooBarData();

  useEffect(() => {
    socket.on("fooBar", setFooBarData);

    return () => {
      socket.off("fooBar", setFooBarData);
    };
  }, [setFooBarData]);

  return (
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
  );
}

export default function FooBar() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.emit("pre-disconnect", socket.id);
    socket.disconnect();
  }

  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    function connect() {
      setSocketIsConnected(true);
    }

    function disconnect() {
      setSocketIsConnected(false);
    }

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
    };
  }, []);

  return (
    <Wrapper>
      <Header socketIsConnected={socketIsConnected} text={"NodeJS Server 1"} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
