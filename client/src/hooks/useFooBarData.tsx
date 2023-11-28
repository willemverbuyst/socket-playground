import { useCallback, useState } from "react";
import { toast } from "react-toastify";

function useFooBarData() {
  const [data, setData] = useState<number[]>([]);

  const notify = useCallback((value: string) => {
    toast(value);
  }, []);

  function setFooBarData(value: number) {
    setData((prev) => {
      const newFooBar =
        prev.length < 10 ? [...prev, value] : [...prev, value].slice(1);

      return newFooBar;
    });

    if (value > 90) {
      notify(`[NodeJS Server 1]: ${value}, value exceeds 90`);
    }
  }

  return { fooBarData: data, setFooBarData };
}

export default useFooBarData;
