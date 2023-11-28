import { useState } from "react";

export default function useQuuxData() {
  const [data, setData] = useState<number[]>([]);

  function setQuuxData(value: number) {
    setData((prev) => {
      return prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);
    });
  }

  return { quuxData: data, setQuuxData };
}
