import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function useFooBarData() {
  const [data, setData] = useState<number[]>([]);

  const notify = useCallback((value: string) => {
    toast(value);
  }, []);

  function setFooBarData(value: number) {
    setData((prev) => {
      return prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);
    });

    if (value > 90) {
      notify(`[NodeJS Server 1]: ${value}, value exceeds 90`);
    }
  }

  return { fooBarData: data, setFooBarData };
}
