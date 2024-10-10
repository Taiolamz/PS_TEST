import { format } from "date-fns";

export const formatRMDatePicker = (date: any) => {
  // Format the date as 'YYYY-MM-DD'
  const day = date?.day?.toString()?.padStart(2, "0");
  const month = date?.month?.number?.toString()?.padStart(2, "0");
  const year = date?.year;

  return `${day}-${month}-${year}`;
};

export const formatMonthYear = (date: any) => {
  // Format the date as 'YYYY-MM'
  const month = date?.month?.number?.toString()?.padStart(2, "0");
  const year = date?.year;

  return `${month}-${year}`;
};

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatTimestamp = (timestamp: string | number | Date) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    // throw new Error("Invalid time");
    console.log("error");
  }
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  let timeDiff: string;
  if (diffInSeconds < 60) {
    timeDiff = `${diffInSeconds} secs`;
  } else if (diffInSeconds < 3600) {
    timeDiff = `${Math.floor(diffInSeconds / 60)} mins`;
  } else if (diffInSeconds < 86400) {
    timeDiff = `${Math.floor(diffInSeconds / 3600)} hrs`;
  } else {
    timeDiff = `${Math.floor(diffInSeconds / 86400)} days`;
  }

  return `${formattedDate}, ${timeDiff}`;
};

export const formatToReadableDate = (dateString: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const daySuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${daySuffix(day)} ${month}, ${year}`;
};

export const formatToDDMMYYYY = (date: string | Date): string => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
};

// Helper function to parse date in DD/MM/YYYY format
export const parseDate = (value: any) => {
  const [day, month, year] = value.split("/");
  return new Date(`${year}-${month}-${day}`);
};

export const formatToReadableDateShort = (isoDate: string): string => {
  try {
    return format(new Date(isoDate), "do MMM yyyy");
  } catch (error) {
    throw new Error("Invalid date format");
  }
};

//Get current month eg () => 'September'
export function getCurrentMonth() {
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
}
