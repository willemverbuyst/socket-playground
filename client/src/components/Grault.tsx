import { useEffect } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts";
import { PYTHON_SERVER } from "../config/severs.ts";
import { pythonSocket as socket } from "../config/socket";
import useSocket from "../hooks/useSocket.tsx";
import useSocketData from "../hooks/useSocketData.tsx";
import Button from "./Button";
import Header from "./Header.tsx";
import Wrapper from "./Wrapper";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: PYTHON_SERVER });

  useEffect(() => {
    socket.on("grault", handleData);

    return () => {
      socket.off("grault", handleData);
    };
  }, [handleData]);

  const parseDomain = () => [0, Math.max.apply(data)];

  const domain = parseDomain();

  return (
    <section className="flex flex-col">
      <ScatterChart
        width={300}
        height={50}
        margin={{ top: 10, right: 0, bottom: -10, left: 0 }}
      >
        <ZAxis type="number" dataKey="x" domain={domain} range={[0, 200]} />
        <XAxis dataKey="x" hide={true} />
        <YAxis dataKey="y" hide={true} />
        <Scatter data={data.map((i) => ({ x: i, y: 1 }))} fill="#00ffff" />
      </ScatterChart>
      <ScatterChart
        width={300}
        height={50}
        margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
      >
        <ZAxis type="number" dataKey="x" domain={domain} range={[0, 200]} />
        <XAxis dataKey="x" hide={true} />
        <YAxis dataKey="y" hide={true} />
        <Scatter
          data={data.reverse().map((i) => ({ x: i, y: 1 }))}
          fill="#ff007f"
        />
      </ScatterChart>
    </section>
  );
}
export default function Grault() {
  const { connect, disconnect, socketIsConnected } = useSocket({ socket });

  return (
    <Wrapper>
      <Header socketIsConnected={socketIsConnected} text={PYTHON_SERVER} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
