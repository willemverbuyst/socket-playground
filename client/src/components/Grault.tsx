import { useEffect, useState } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts";
import { socket3 as socket } from "../config/socket";
import useGraultData from "../hooks/useGraultData";
import Button from "./Button";
import Wrapper from "./Wrapper";

export default function Grault() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const { graultData, setGraultData } = useGraultData();

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
    socket.on("grault", setGraultData);

    return () => {
      socket.off("connect", connect);
      socket.off("disonnect", disconnect);
      socket.off("grault", setGraultData);
    };
  }, [setGraultData]);

  const parseDomain = () => [0, Math.max.apply(graultData)];

  const domain = parseDomain();

  return (
    <Wrapper>
      <section className="flex w-96 justify-between p-4 py-5">
        <p className="text-xl">{`Python Server ${
          socketIsConnected ? "✅" : "❎"
        }`}</p>
        {socketIsConnected ? (
          <Button clickHandler={disconnect} caption="Disconnect" />
        ) : (
          <Button clickHandler={connect} caption="Connect" />
        )}
      </section>
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
    </Wrapper>
  );
}
