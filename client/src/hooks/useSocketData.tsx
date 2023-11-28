import { useCallback, useState } from "react";
import { toast } from "react-toastify";

type UseSocketDataProps = {
  serverName: string;
};
export default function useSocketData({ serverName }: UseSocketDataProps) {
  const [data, setData] = useState<number[]>([]);

  const notify = useCallback((value: string) => {
    toast(value);
  }, []);

  function handleData(value: number) {
    setData((prev) => {
      return prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);
    });

    if (value > 90) {
      notify(`[${serverName}]: ${value}, value exceeds 90`);
    }
  }

  return { data, handleData };
}
