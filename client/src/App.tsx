import { useEffect, useState } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import "./App.css";
import { socket1, socket2 } from "./socket";

export default function App() {
  const [socket1IsConnected, setSocket1IsConnected] = useState(
    socket1.connected
  );
  const [socket2IsConnected, setSocket2IsConnected] = useState(
    socket2.connected
  );
  const [fooBarData, setFooBarData] = useState<number[]>([]);
  const [quuxData, setQuuxData] = useState<number[]>([]);

  useEffect(() => {
    function onConnect1() {
      setSocket1IsConnected(true);
    }

    function onDisconnect1() {
      setSocket1IsConnected(false);
    }

    function onConnect2() {
      setSocket2IsConnected(true);
    }

    function onDisconnect2() {
      setSocket2IsConnected(false);
    }

    function handleFooBar(value: number) {
      setFooBarData((prev) => {
        const newFooBar =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newFooBar;
      });
    }

    function handleQuux(value: number) {
      setQuuxData((prev) => {
        const newQuux =
          prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

        return newQuux;
      });
    }

    socket1.on("connect", onConnect1);
    socket1.on("disconnect", onDisconnect1);
    socket1.on("fooBar", handleFooBar);
    socket2.on("connect", onConnect2);
    socket2.on("disconnect", onDisconnect2);
    socket2.on("quux", handleQuux);

    return () => {
      socket1.off("connect", onConnect1);
      socket1.off("disconnect", onDisconnect1);
      socket1.off("fooBar", handleFooBar);
      socket2.off("connect", onConnect2);
      socket2.off("disconnect", onDisconnect2);
      socket2.off("quux", handleQuux);
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello world</h1>
      <section>
        <p>{`Socket 1 is ${
          socket1IsConnected ? "connected" : "not connected"
        }`}</p>
        <section
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <BarChart
            width={300}
            height={100}
            data={fooBarData.map((i) => ({ v: i }))}
          >
            <YAxis type="number" domain={[0, 100]} hide />
            <Bar dataKey="v" fill="#00ff44" />
          </BarChart>
        </section>
      </section>
      <section>
        <p>{`Socket 2 is ${
          socket2IsConnected ? "connected" : "not connected"
        }`}</p>
        <section
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <BarChart
            width={300}
            height={100}
            data={quuxData.map((i) => ({ v: i }))}
          >
            <YAxis type="number" domain={[0, 100]} hide />
            <Bar dataKey="v" fill="#ff0044" />
          </BarChart>
        </section>
      </section>
    </div>
  );
}
