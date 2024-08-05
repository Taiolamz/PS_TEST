import chroma from "chroma-js";
import { adminRoleList, employeeRoleList, specialRoleList } from "../routes";

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

export function getPrimaryColorAccent(color: string, opacity = 0.1) {
  try {
    const rgba = chroma(color).rgba(); // Convert to RGBA array
    rgba[3] = opacity; // Set the opacity
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
  } catch (error) {
    // console.error("Invalid color input:", color);
    return null; // Return null or handle the error as appropriate
  }
}

export function returnInitial(name: string) {
  if (name) {
    const i = name?.split(" ");
    if (i.length > 1) {
      return i[0]?.slice(0, 1).toUpperCase() + i[1]?.slice(0, 1).toUpperCase();
    } else {
      return i[0]?.slice(0, 1).toUpperCase() + i[0]?.slice(1, 2).toUpperCase();
    }
  } else {
    return "";
  }
}

function normalizeString(str: string) {
  return str?.toLowerCase();
}

export function checkUserRole(item: string) {
  const normalizedItem = normalizeString(item);

  // if (specialRoleList?.map(normalizeString).includes(normalizedItem)) {
  //   return "SUPER ADMIN";
  // } else

  if (adminRoleList?.map(normalizeString).includes(normalizedItem)) {
    return "ADMIN";
  } else if (employeeRoleList?.map(normalizeString).includes(normalizedItem)) {
    return "EMPLOYEE";
  } else {
    return "EMPLOYEE";
  }
}
