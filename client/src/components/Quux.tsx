import { useEffect, useState } from "react";
import { Area, AreaChart, YAxis } from "recharts";
import { socket2 as socket } from "../config/socket";
import useQuuxData from "../hooks/useQuuxData";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Header from "./Header.tsx";

export default function Quux() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const { quuxData, setQuuxData } = useQuuxData();

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
    socket.on("quux", setQuuxData);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      socket.off("quux", setQuuxData);
    };
  }, [setQuuxData]);

  return (
    <Wrapper>
      <Header socketIsConnected={socketIsConnected} text={"NodeJS Server 2"} />

      <section className="flex flex-col">
        <AreaChart
          width={300}
          height={100}
          data={quuxData.map((i) => ({ v: i }))}
        >
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
      <section className="flex w-96 justify-end p-4 py-5">
        {socketIsConnected ? (
          <Button clickHandler={disconnect} caption="Disconnect" />
        ) : (
          <Button clickHandler={connect} caption="Connect" />
        )}
      </section>
    </Wrapper>
  );
}
