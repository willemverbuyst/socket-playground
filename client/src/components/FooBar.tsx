import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useSocket from "@/hooks/useSocket.ts";
import { useEffect } from "react";
import { Bar, BarChart, YAxis } from "recharts";
import { nodeSocket1 as socket } from "../config/socket.ts";
import useSocketData from "../hooks/useSocketData.ts";

function Chart() {
  const { data, handleData } = useSocketData();

  useEffect(() => {
    socket.on("foobar", handleData);

    return () => {
      socket.off("foobar", handleData);
    };
  }, [handleData]);

  return (
    <section className="flex flex-col">
      <BarChart width={300} height={100} data={data.map((i) => ({ v: i }))}>
        <YAxis type="number" domain={[0, 100]} hide />
        <Bar dataKey="v" fill="#00ff44" isAnimationActive={false} />
      </BarChart>
    </section>
  );
}

export function FooBar() {
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
        <CardTitle className="text-center uppercase font-thin">
          FooBar
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Chart />
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <Switch
            id="foobar-socket"
            checked={socketIsConnected}
            onCheckedChange={handleSwitch}
            className="data-[state=checked]:bg-gray-500"
          />
          <Label htmlFor="foobar-socket" className="text-gray-500">
            {socketIsConnected ? "connected" : "disconnected"}
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
