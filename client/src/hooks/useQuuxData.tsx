import { useState } from "react";

function useQuuxData() {
  const [data, setData] = useState<number[]>([]);

  function setQuuxData(value: number) {
    setData((prev) => {
      const newQuux =
        prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

      return newQuux;
    });
  }

  return { quuxData: data, setQuuxData };
}

export default useQuuxData;
