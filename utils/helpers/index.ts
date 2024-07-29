export const timeToMinuteSecond = (time: number) =>
  `${Math.floor(time / 60)}:${("0" + (time % 60)).slice(-2)}`;

export const maskEmail = (email: string) => {
  return (
    email.substring(0, 3) + "*****" + "." + email.split("@")[1].split(".")[1]
  );
};

export const generateQueryString = (params: { [key: string]: any }): string => {
  const queryParams = [];

  for (const key in params) {
    const value = params[key];
    if (value || value === 0 || value === false) {
      queryParams.push(`${key}=${value}`);
    }
  }

  if (queryParams.length > 0) {
    return `?${queryParams.join("&")}`;
  } else {
    return "";
  }
};

