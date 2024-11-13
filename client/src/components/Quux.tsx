import { useEffect } from "react";
import { Area, AreaChart, YAxis } from "recharts";
import { NODE_SERVER_2 } from "../config/severs.ts";
import { nodeSocket2 as socket } from "../config/socket";
import useSocket from "../hooks/useSocket.tsx";
import useSocketData from "../hooks/useSocketData.tsx";
import Button from "./Button";
import Header from "./Header.tsx";
import Wrapper from "./Wrapper";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: NODE_SERVER_2 });

  useEffect(() => {
    socket.on("quux", handleData);

    return () => {
      socket.off("quux", handleData);
    };
  }, [handleData]);

  return (
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
  );
}

export default function Quux() {
  const { connect, disconnect, socketIsConnected } = useSocket({ socket });

  return (
    <Wrapper>
      <Header socketIsConnected={socketIsConnected} text={NODE_SERVER_2} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
