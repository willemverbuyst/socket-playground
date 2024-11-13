import { useEffect } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { NODE_SERVER_1 } from "../config/severs.ts";
import { nodeSocket1 as socket } from "../config/socket";
import useSocket from "../hooks/useSocket.tsx";
import useSocketData from "../hooks/useSocketData.tsx";
import Button from "./Button";
import Header from "./Header.tsx";
import Wrapper from "./Wrapper";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: NODE_SERVER_1 });

  useEffect(() => {
    socket.on("fooBar", handleData);

    return () => {
      socket.off("fooBar", handleData);
    };
  }, [handleData]);

  return (
    <section className="flex flex-col">
      <BarChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
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
      <Header socketIsConnected={socketIsConnected} text={NODE_SERVER_1} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
