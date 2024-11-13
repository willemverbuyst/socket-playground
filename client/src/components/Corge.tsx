import { useEffect } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { DENO_SERVER } from "../config/severs.ts";
import { denoSocket as socket } from "../config/socket";
import useSocket from "../hooks/useSocket.tsx";
import useSocketData from "../hooks/useSocketData.tsx";
import Button from "./Button";
import Header from "./Header.tsx";
import Wrapper from "./Wrapper";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: DENO_SERVER });

  useEffect(() => {
    socket.on("corge", handleData);

    return () => {
      socket.off("corge", handleData);
    };
  }, [handleData]);

  return (
    <section className="flex flex-col">
      <BarChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
        <YAxis type="number" domain={[0, 100]} hide />
        <Bar dataKey="v" fill="#f344f3" isAnimationActive={false} />
      </BarChart>
    </section>
  );
}

export default function Corge() {
  const { connect, disconnect, socketIsConnected } = useSocket({ socket });

  return (
    <Wrapper>
      <Header socketIsConnected={socketIsConnected} text={DENO_SERVER} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
