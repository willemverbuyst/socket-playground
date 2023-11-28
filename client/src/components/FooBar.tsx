import { useEffect } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { socket1 as socket } from "../config/socket";
import useFooBarData from "../hooks/useFooBarData";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Header from "./Header.tsx";
import useSocket from "../hooks/useSocket.tsx";

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
  const { connect, disconnect, socketIsConnected } = useSocket({ socket });

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
