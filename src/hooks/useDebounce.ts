import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 100) => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return result;
};
