import { useCallback, useState } from "react";

export const trimLongString = (str: string | undefined, num: number) => {
  if (str && num) {
    const val =
      String(str).length > Number(num)
        ? `${String(str).slice(0, Number(num))}...`
        : str;
    // console.log(val);

    return val;
  }
};

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useCallback(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
