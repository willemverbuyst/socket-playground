import { useState } from "react";

export default function useSocketData() {
  const [data, setData] = useState<number[]>([]);

  function handleData(value: number) {
    setData((prev) => {
      return prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);
    });
  }

  return { data, handleData };
}
