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
    throw new Error("Invalid time");
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