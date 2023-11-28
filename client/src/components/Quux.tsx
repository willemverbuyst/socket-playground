import { useEffect } from "react";
import { Area, AreaChart, YAxis } from "recharts";
import { socket2 as socket } from "../config/socket";
import useQuuxData from "../hooks/useQuuxData";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Header from "./Header.tsx";
import useSocket from "../hooks/useSocket.tsx";

function Chart() {
  const { quuxData, setQuuxData } = useQuuxData();

  useEffect(() => {
    socket.on("quux", setQuuxData);

    return () => {
      socket.off("quux", setQuuxData);
    };
  }, [setQuuxData]);

  return (
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
  );
}

export default function Quux() {
  const { connect, disconnect, socketIsConnected } = useSocket({ socket });

  return (
    <Wrapper>
      <Header socketIsConnected={socketIsConnected} text={"NodeJS Server 2"} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
