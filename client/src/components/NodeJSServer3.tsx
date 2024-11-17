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
import { NODE_SERVER_3 } from "../config/severs.ts";
import { nodeSocket3 as socket } from "../config/socket.ts";
import useSocket from "../hooks/useSocket.ts";
import useSocketData from "../hooks/useSocketData.ts";

function Chart() {
  const { data, handleData } = useSocketData({ serverName: NODE_SERVER_3 });

  useEffect(() => {
    socket.on("nodejsserver3", handleData);

    return () => {
      socket.off("nodejsserver3", handleData);
    };
  }, [handleData]);

  return (
    <section className="flex flex-col">
      <AreaChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
        <YAxis type="number" domain={[0, 100]} hide />
        <Area
          type="monotone"
          dataKey="v"
          fill="#eeaa11"
          isAnimationActive={false}
          dot={false}
        />
      </AreaChart>
    </section>
  );
}

export default function NodeJSServer3() {
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
        <CardTitle className="text-center uppercase font-thin">Baz</CardTitle>
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
