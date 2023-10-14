import { useEffect, useState } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts";
import Button from "./components/Button";
import Wrapper from "./components/Wrapper";
import { socket3 as socket } from "./socket";

export default function Grault() {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const [data, setData] = useState<number[]>([]);

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

    function handleGrault(value: number) {
      setData((prev) => {
        const newFooBar =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newFooBar;
      });
    }

    socket.connect();

    socket.on("connect", connect);
    socket.on("disconnect", disConnect);
    socket.on("grault", handleGrault);

    return () => {
      socket.off("connect", connect);
      socket.off("disonnect", disconnect);
      socket.off("grault", handleGrault);
    };
  }, []);

  const parseDomain = () => [0, Math.max.apply(null, data)];

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
    </Wrapper>
  );
}
