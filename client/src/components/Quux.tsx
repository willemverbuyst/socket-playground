import { useEffect } from "react";
import { Area, AreaChart, YAxis } from "recharts";
import { socket2 as socket } from "../config/socket";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Header from "./Header.tsx";
import useSocket from "../hooks/useSocket.tsx";
import useSocketData from "../hooks/useSocketData.tsx";
import { SERVER2 } from "../config/severs.ts";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: SERVER2 });

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
      <Header socketIsConnected={socketIsConnected} text={SERVER2} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
