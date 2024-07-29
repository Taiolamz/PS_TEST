export const formatRMDatePicker = (date: any) => {
  // Format the date as 'YYYY-MM-DD'
  const day = date?.day?.toString()?.padStart(2, "0");
  const month = date?.month?.number?.toString()?.padStart(2, "0");
  const year = date?.year;

  return `${year}-${month}-${day}`;
};
