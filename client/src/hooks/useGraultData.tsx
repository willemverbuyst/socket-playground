import { useState } from "react";

function useGraultData() {
  const [data, setData] = useState<number[]>([]);

  function setGraultData(value: number) {
    setData((prev) => {
      const newFooBar =
        prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

      return newFooBar;
    });
  }

  return { graultData: data, setGraultData };
}

export default useGraultData;
