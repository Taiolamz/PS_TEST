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
