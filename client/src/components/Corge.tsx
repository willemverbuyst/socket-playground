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
import { Bar, BarChart, YAxis } from "recharts";
import { NODE_SERVER_4 } from "../config/severs.ts";
import { nodeSocket4 as socket } from "../config/socket.ts";
import useSocket from "../hooks/useSocket.ts";
import useSocketData from "../hooks/useSocketData.ts";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: NODE_SERVER_4 });

  useEffect(() => {
    socket.on("nodejsserver4", handleData);

    return () => {
      socket.off("nodejsserver4", handleData);
    };
  }, [handleData]);

  return (
    <section className="flex flex-col">
      <BarChart
        width={300}
        height={100}
        data={data.map((i) => ({ a: i * 0.6, b: i * 0.4 }))}
      >
        <YAxis type="number" domain={[0, 100]} hide />
        <Bar dataKey="a" stackId="a" fill="#44ffad" isAnimationActive={false} />
        <Bar dataKey="b" stackId="a" fill="#aaa" isAnimationActive={false} />
      </BarChart>
    </section>
  );
}

export function Corge() {
  const { connect, disconnect, socketIsConnected } = useSocket({ socket });

  function handleSwitch() {
    if (socketIsConnected) {
      disconnect();
    } else {
      connect();
    }
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-center uppercase font-thin">Corge</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Chart />
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <Switch
            id="quux-socket"
            checked={socketIsConnected}
            onCheckedChange={handleSwitch}
            className="data-[state=checked]:bg-gray-500"
          />
          <Label htmlFor="quux-socket" className="text-gray-500">
            {socketIsConnected ? "connected" : "disconnected"}
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
