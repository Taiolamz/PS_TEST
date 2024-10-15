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

export const abbreviateMonth = (month: string) => {
  return month.slice(0, 3);
};

export const numberToWords = (num: number) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num === 0) return "Zero";
  if (num > 10 && num < 20) return teens[num - 11];

  const tensPlace = Math.floor(num / 10);
  const onesPlace = num % 10;

  return tens[tensPlace] + (onesPlace > 0 ? ` ${ones[onesPlace]}` : "");
};
