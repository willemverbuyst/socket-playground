import { useState } from "react";
import { useToast } from "./use-toast";

type UseSocketDataProps = {
  serverName: string;
};
export default function useSocketData({ serverName }: UseSocketDataProps) {
  const { toast } = useToast();
  const [data, setData] = useState<number[]>([]);

  function handleData(value: number) {
    setData((prev) => {
      return prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);
    });

    if (value > 95) {
      toast({
        title: serverName,
        description: `Value ${value} - danger zone! (>95)`,
        variant: "destructive",
      });
    }
  }

  return { data, handleData };
}
