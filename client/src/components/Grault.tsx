import { useEffect } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts";
import { socket3 as socket } from "../config/socket";
import useGraultData from "../hooks/useGraultData";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Header from "./Header.tsx";
import useSocket from "../hooks/useSocket.tsx";

function Chart() {
  const { graultData, setGraultData } = useGraultData();

  useEffect(() => {
    socket.on("grault", setGraultData);

    return () => {
      socket.off("grault", setGraultData);
    };
  }, [setGraultData]);

  const parseDomain = () => [0, Math.max.apply(graultData)];

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
        <Scatter
          data={graultData.map((i) => ({ x: i, y: 1 }))}
          fill="#00ffff"
        />
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
          data={graultData.reverse().map((i) => ({ x: i, y: 1 }))}
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
      <Header socketIsConnected={socketIsConnected} text={"Python Server"} />
      <Chart />
      <Button
        socketIsConnected={socketIsConnected}
        connect={connect}
        disconnect={disconnect}
      />
    </Wrapper>
  );
}
