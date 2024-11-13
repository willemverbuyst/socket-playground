import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts";
import { PYTHON_SERVER } from "../config/severs.ts";
import { pythonSocket as socket } from "../config/socket.ts";
import useSocket from "../hooks/useSocket.ts";
import useSocketData from "../hooks/useSocketData.ts";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: PYTHON_SERVER });

  useEffect(() => {
    socket.on("pythonserver", handleData);

    return () => {
      socket.off("pythonserver", handleData);
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
export default function PythonServer() {
  const { connect, disconnect, socketIsConnected } = useSocket({ socket });

  function handleSwitch() {
    if (socketIsConnected) {
      disconnect();
    } else {
      connect();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center uppercase font-thin">
          {PYTHON_SERVER}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Chart />
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <Switch
            id="grault-socket"
            checked={socketIsConnected}
            onCheckedChange={handleSwitch}
            className="data-[state=checked]:bg-gray-500"
          />
          <Label htmlFor="grault-socket" className="text-gray-500">
            {socketIsConnected ? "connected" : "disconnected"}
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
