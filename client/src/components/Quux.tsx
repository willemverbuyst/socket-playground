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
import { Area, AreaChart, YAxis } from "recharts";
import { NODE_SERVER_2 } from "../config/severs.ts";
import { nodeSocket2 as socket } from "../config/socket.ts";
import useSocket from "../hooks/useSocket.ts";
import useSocketData from "../hooks/useSocketData.ts";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: NODE_SERVER_2 });

  useEffect(() => {
    socket.on("nodejsserver2", handleData);

    return () => {
      socket.off("nodejsserver2", handleData);
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

export function Quux() {
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
        <CardTitle className="text-center uppercase font-thin">Quux</CardTitle>
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
