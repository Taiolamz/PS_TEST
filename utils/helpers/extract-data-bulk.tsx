import * as XLSX from "xlsx"; // Import XLSX for Excel file processing

// Define types for expected format and the result object
type ExpectedFormat = {
  [index: number]: {
    name: string;
    required: boolean;
    key: string;
  };
};
 
type Result = {
  status: "success" | "failed";
  array: any[];
  message: string;
};

/**
 * Function to handle file upload and validate contents based on expected format.
 * @param {File} file - The file to be processed.
 * @param {ExpectedFormat} expectedFormat - An object specifying the expected format of the file.
 * @param {number} maxRows - The maximum number of rows allowed (default is 200).
 * @returns {Promise<Result>} - A promise that resolves with the result of the file processing.
 */
export function getDataFromFileUpload(
  file: File,
  expectedFormat: ExpectedFormat,
  maxRows: number = 200
): Promise<Result> {
  return new Promise((resolve) => {
    // Check file type
    const fileType = file.type;
    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel
      "text/csv" // CSV
    ];

    if (!validFileTypes.includes(fileType)) {
      resolve({
        status: "failed",
        array: [],
        message: "Unsupported file type. Please upload an Excel or CSV file.",
      });
      return;
    }

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      const bstr = e?.target?.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const parsedJson: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const headers = parsedJson[0] || [];

      // Validate format
      const missingFields = Object.keys(expectedFormat).map((index) => {
        const column = expectedFormat[Number(index)];
        return column?.required && column?.name !== headers[Number(index)]
          ? { row: 1, column: column?.name }
          : null;
      }).filter((item) => item !== null);

      if (missingFields.length > 0) {
        const messages = missingFields.map(
          (field) =>
            `Row ${field?.row}: ${field?.column} field is required, please check uploaded file.`
        );
        resolve({
          status: "failed",
          array: [],
          message: messages[0]!,
        });
        return;
      }

      // Structure data and filter out rows missing required fields
      const structuredData = parsedJson.slice(1).reduce((acc, row) => {
        const formattedRow: { [key: string]: any } = {};
        let allRequiredPresent = true;

        Object.keys(expectedFormat).forEach((index) => {
          const column = expectedFormat[Number(index)];
          const value = row[Number(index)];

          if (column?.required && !value) {
            allRequiredPresent = false;
          }

          formattedRow[column.key] = value || (column.required ? "" : "");
        });

        if (allRequiredPresent) {
          acc.push(formattedRow);
        }

        return acc;
      }, [] as any[]);

      // Check for row limit
      if (structuredData.length > maxRows) {
        resolve({
          status: "failed",
          array: [],
          message: `Row limit exceeded. Maximum allowed rows are ${maxRows}.`,
        });
        return;
      }

      if (structuredData.length === 0) {
        resolve({
          status: "failed",
          array: [],
          message:
            "No valid data found with all required fields, please check uploaded file.",
        });
      } else {
        resolve({
          status: "success",
          array: structuredData,
          message: "File processed successfully.",
        });
      }
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  });
}
