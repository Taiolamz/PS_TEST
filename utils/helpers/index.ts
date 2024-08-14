import chroma from "chroma-js";
import { adminRoleList, employeeRoleList, specialRoleList } from "../routes";
import { format, parse, isValid } from "date-fns";

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
  return str?.trim()?.toLowerCase();
}

export function checkUserRole(item: string | string[]) {
  // Function to check if a normalized item is in a list
  const isInList = (list: string[], value: string) =>
    list.map(normalizeString)?.includes(value);

  // Normalize item(s)
  const normalizedItems = Array.isArray(item)
    ? item?.map(normalizeString)
    : [normalizeString(item)];
  // Check against each list
  for (const normalizedItem of normalizedItems) {
    // if (isInList(specialRoleList, normalizedItem)) {
    //   return "SUPER ADMIN";
    // } else

    if (isInList(adminRoleList, normalizedItem)) {
      return "ADMIN";
    } else if (isInList(employeeRoleList, normalizedItem)) {
      return "EMPLOYEE";
    }
  }

  // Default role if no match found
  return "EMPLOYEE";
}

export const iife = <T>(fn: () => T) => fn();
export const removeCharFromString = (str: string, char: string) =>
  str.replace(new RegExp(char, "g"), "");

// Custom date validation function
export const isValidDate = (dateString: string | any) => {
  const parsedDate = parse(dateString, "yyyy-mm-dd", new Date());
  return isValid(parsedDate) && dateString.length === 10;
};

export const PAGE_TABS = {
  SUPER_ADMIN: [
    {
      id: 1,
      title: "Mission Plan",
      accessor: "mission-plan",
    },
    {
      id: 2,
      title: "All Employees",
      accessor: "all-employees",
    },
  ],
  MANAGIN_DIRECTOR: [
    {
      id: 1,
      title: "My Mission Plan",
      accessor: "mission-plan",
    },
    {
      id: 2,
      title: "All Employees",
      accessor: "all-employees",
    },
  ],
  LINE_MANAGER: [
    {
      id: 1,
      title: "My Mission Plan",
      accessor: "mission-plan",
    },
    {
      id: 2,
      title: "Direct Downlines",
      accessor: "downlines",
    },
    {
      id: 3,
      title: "Approvals",
      accessor: "approvals",
    },
  ],
  EMPLOYEE: [
    {
      id: 1,
      title: "My Mission Plan",
      accessor: "mission-plan",
    },
    {
      id: 2,
      title: "Direct Downlines",
      accessor: "downlines",
    },
  ],
};

// ROLES ALLOWED TO CREATE FINANCIAL YEAR
export const CAN_CREATE_FINANCIAL_YEAR = ["super-admin"];
export const SUPER_ADMIN = "super-admin";
export const MANAGING_DIRECTOR = "ceo";

// GET TABS
type ARG_TYPES = {
  role: string;
  isLineManager: boolean;
};
export const getAvailableTabs = (arg: ARG_TYPES) => {
  if (arg.role === SUPER_ADMIN) {
    return PAGE_TABS.SUPER_ADMIN;
  }
  if (arg.role === MANAGING_DIRECTOR) {
    return PAGE_TABS.MANAGIN_DIRECTOR;
  }
  if (
    arg.role !== SUPER_ADMIN &&
    arg.role !== MANAGING_DIRECTOR &&
    arg.isLineManager
  ) {
    return PAGE_TABS.LINE_MANAGER;
  }
  return PAGE_TABS.EMPLOYEE;
};

export function processInputAsArray(value: any) {
  if (value) {
    if (typeof value === "string") {
      // Split the string by commas and trim any extra spaces around the items
      return value?.split(",").map((item) => item.trim());
    } else if (Array?.isArray(value)) {
      // Return the array as is if it's already an array
      // console.log('here');

      return value;
    } else {
      // Handle other types if necessary
      throw new Error("Input must be a string or an array of strings");
    }
  }
}

export function formatChecklistPercent(param: any) {
  if (param) {
    const val = Number(param?.replace("%", ""));
    // console.log(val);
    return val;
  }
}

export function getLinksAndCollapseNumByTitle(data: any, title: any) {
  const section = data.find((item: any) => item.title === title);

  if (!section) {
    return { links: [], collapseNum: null };
  }

  const links = section.navLinks
    .reduce((acc: any, navLink: any) => {
      acc.push(navLink.link);
      if (navLink.relatedLink) {
        acc = acc.concat(navLink.relatedLink);
      }
      return acc;
    }, [])
    .filter((link: any) => link !== ""); // Filter out empty strings

  return { links, collapseNum: section.collapseNum };
}

export const truncateString = (str: string, maxLength: number = 50) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export function findObjectIndexByLabel(arr: any, label: any) {
  return arr.findIndex((item: any) => item?.label === label) + 1;
}


export function replaceEmptyValuesWithPlaceholder<T extends Record<string, any>>(array: T[], placeholder: string = "---"): T[] {
  return array?.map(obj => {
    const newObj = { ...obj }; // Create a shallow copy of the object
    (Object?.keys(newObj) as (keyof T)[])?.forEach(key => {
      if (newObj[key] === "") {
        newObj[key] = placeholder as any; // Replace empty value with placeholder
      }
    });
    return newObj;
  });
}
