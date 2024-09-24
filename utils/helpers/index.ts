import chroma from "chroma-js";
import { adminRoleList, employeeRoleList, specialRoleList } from "../routes";
import { format, parse, isValid } from "date-fns";
import { Dictionary } from "@/@types/dictionary";

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
      title: "Financial Year Details",
      accessor: "mission-plan",
    },
    {
      id: 2,
      title: "Organization Mission Plans",
      accessor: "all-employees",
    },
  ],
  ADMINS: [
    {
      id: 1,
      title: "Financial Year Details",
      accessor: "mission-plan",
    },
    {
      id: 2,
      title: "Organization Mission Plans",
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
    {
      id: 3,
      title: "Direct Downlines",
      accessor: "downlines",
    },
    {
      id: 4,
      title: "Approvals",
      accessor: "approvals",
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
    {
      id: 3,
      title: "Approvals",
      accessor: "approvals",
    },
  ],
};

export const REPORT_PAGE_TABS = {
  ADMINS: [
    {
      id: 1,
      title: "Organization Report",
      accessor: "organization-report",
    },
    {
      id: 2,
      title: "Outcome/Target Settings",
      accessor: "set-outcome-target",
    },
  ],
  EMPLOYEE: [
    {
      id: 1,
      title: "My Report",
      accessor: "my_report",
    },
    {
      id: 2,
      title: "Measure of Success",
      accessor: "measure_of_success",
    },
    {
      id: 3,
      title: "Task Outcome",
      accessor: "task_outcome",
    },
    {
      id: 4,
      title: "Approvals",
      accessor:  "approvals",
    },
    {
      id: 5,
      title: "Downlines",
      accessor: "downlines",
    },
  ],
};

// ROLES ALLOWED TO CREATE FINANCIAL YEAR
export const CAN_CREATE_FINANCIAL_YEAR = ["super-admin", "strategy-admin"];
export const SUPER_ADMIN = "super-admin";
export const ADMINS = ["super-admin", "strategy-admin", "hr-admin"];
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

function normalizeStrings(arr: string[]): string[] {
  return arr.map((str: string): string => {
    // Convert to lowercase
    const lowerStr = str.toLowerCase();

    // Change the entire string based on specific substrings
    if (lowerStr.includes("subsidia")) {
      return "subsidiary";
    }
    if (lowerStr.includes("depart")) {
      return "department";
    }
    if (lowerStr.includes("branch")) {
      return "branch";
    }
    if (lowerStr.includes("unit")) {
      return "unit";
    }

    // If no matching substring is found, return the lowercase string
    return lowerStr;
  });
}

export function processInputAsArray(value: any) {
  if (value) {
    if (typeof value === "string") {
      // console.log(value);

      // Split the string by commas and trim any extra spaces around the items
      // console.log(value?.split(",")?.map((item) => item.trim()));

      return normalizeStrings(value?.split(",")?.map((item) => item.trim()));
    } else if (Array?.isArray(value)) {
      // Return the array as is if it's already an array
      // console.log('here');

      return normalizeStrings(value);
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

export const formatBehaviours = (
  behavioursString: string | undefined | null
) => {
  // Check if the input is a JSON array string
  const isJSONArrayString = (str: string) => {
    return str.startsWith("[") && str.endsWith("]");
  };

  // Parse the JSON string safely
  const parseJSON = (str: string) => {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  // Join the json array into a string
  const joinBehaviours = (behavioursArray: any[]) => behavioursArray.join(", ");

  // Main logic
  if (
    typeof behavioursString !== "string" ||
    behavioursString === "" ||
    behavioursString === "[]"
  ) {
    return behavioursString || ""; // Return empty string, "[]", or undefined/null as is
  }

  if (isJSONArrayString(behavioursString)) {
    const behavioursArray = parseJSON(behavioursString);
    return joinBehaviours(behavioursArray);
  }

  // If it's just a plain string, return it as is
  return behavioursString;
};

export function replaceEmptyValuesWithPlaceholder<
  T extends Record<string, any>
>(array: T[], placeholder: string = "---"): T[] {
  return array?.map((obj) => {
    const newObj = { ...obj }; // Create a shallow copy of the object
    (Object?.keys(newObj) as (keyof T)[])?.forEach((key) => {
      if (newObj[key] === "") {
        newObj[key] = placeholder as any; // Replace empty value with placeholder
      }
    });
    return newObj;
  });
}

export const allObjValuesNotEmpty = (data: Dictionary) =>
  Object.values(data).every((d) => d.trim() !== "");

type DataObject = {
  name: string;
  required: boolean;
  key: string;
};

export function extractNamesFromFormat(data: {
  [key: number]: DataObject;
}): string[] {
  return Object.values(data).map((item) => item.name);
}

export const isObjectEmpty = (obj: {}) => {
  if (obj) {
    return Object.keys(obj).length === 0;
  }
};

// GET MISSION ITEMS STATUS FROM APPROVABLE TYPES THAT MATCH THE APPROVABLE_ID AND TYPE
type ApprovablesType = {
  approvable_id: string;
  approvable_type: string;
  status: string;
};

export const getStatus = (
  items: ApprovablesType[] | undefined,
  approvable_type: string,
  approvable_id: string
): string | undefined => {
  if (!Array.isArray(items)) {
    // console.error('Items should be a defined array.');
    return "pending";
  }

  const matchedItem = items.find(
    (item: ApprovablesType) =>
      item.approvable_type === approvable_type &&
      item.approvable_id === approvable_id
  );

  return matchedItem?.status ?? "pending";
};

// Reusable function to find an item by ID
export const findItemById = (
  items: approveItems[],
  searchId: string
): approveItems | undefined => {
  if (items.length === 0) {
    // Return an object with status "pending" if items array is empty
    return { status: "pending" };
  }

  const foundItem = items.find(
    (item: approveItems) => item.approvable_id === searchId
  );
  return foundItem;
};

//END OF GET MISSION ITEMS STATUS FROM APPROVABLE TYPES THAT MATCH THE APPROVABLE_ID AND TYPE

export const getProgressColorByValue = (value: number) => {
  // 0% - 35% => red, 40% - 65% => yellow, 50% - 100% => green
  switch (true) {
    case value <= 35:
      return "red";
    case value <= 65:
      return "yellow";
    default:
      return "green";
  }
};

export function getOrdinalSuffix(num: number): string {
  const remainderTen = num % 10;
  const remainderHundred = num % 100;

  // Handle special cases like 11th, 12th, 13th
  if (remainderHundred >= 11 && remainderHundred <= 13) {
    return `${num}th`;
  }

  // Handle general cases like 1st, 2nd, 3rd, etc.
  switch (remainderTen) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}
