import { useState } from "react";

export default function useGraultData() {
  const [data, setData] = useState<number[]>([]);

  function setGraultData(value: number) {
    setData((prev) => {
      return prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);
    });
  }

  return { graultData: data, setGraultData };
}
