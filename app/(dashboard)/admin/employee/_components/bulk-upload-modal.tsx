"use client";
import { ManceLoader } from "@/components/custom-loader";
 import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDataFromFileUpload } from "@/utils/helpers/extract-data-bulk";
// import { getDataFromFileUpload } from "@/utils/helpers/TextExtract";
import React, { useState } from "react";

interface FileUploadType {
  onSampleCsvDownload: () => void;
  onSampleExcelDownload: () => void;
  onCancel: () => void;
  onBulkUpload: () => void;
  setFile?: any;
  loading?: boolean;
}

const BulkUploadModal = ({
  onSampleCsvDownload,
  onSampleExcelDownload,
  onCancel,
  onBulkUpload,
  setFile,
  loading,
}: FileUploadType) => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && setFile) {
      setUploadedFile(file.name);
      setFile(file);
    } else {
      setUploadedFile(null);
    }
  };
  const btnClass =
    "font-normal py-0 px-4 h-[32px]  transition-all duration-300 ";
  const btnGroup = (
    <div className="flex gap-3 justify-end mt-10  items-center">
      <Button
        variant="outline"
        className={`border-primary text-primary hover:bg-transparent font-light  hover:text-primary ${btnClass}`}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <div
        className={`${!uploadedFile || loading ? "cursor-not-allowed" : ""}`}
      >
        <Button
          onClick={onBulkUpload}
          className={`${btnClass}  font-light ${
            !uploadedFile || loading
              ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
              : ""
          } `}
          disabled={!uploadedFile}
        >
          {loading ? <ManceLoader /> : "Upload"}
        </Button>
      </div>
    </div>
  );

  const expectedFormat = {
    0: { name: "Last Name", required: true, key: "last_name" },
    1: { name: "First Name", required: true, key: "first_name" },
    2: { name: "Account Number", required: true, key: "account_number" },
    3: { name: "Bank", required: true, key: "bank" },
    4: { name: "Bank Code", required: false, key: "bank_code" },
    5: { name: "Salary", required: true, key: "salary" },
    6: { name: "Raven  Username", required: false, key: "raven_username" },
    7: { name: "Employee  Email", required: false, key: "employee_name" },
    8: { name: "Employee Phone", required: false, key: "employee_phone" },
  };

  const handleUploadTest = async (e: any) => {
    const data = await getDataFromFileUpload(e, expectedFormat, 200);
    console.log(data);
  };

  return (
    <div>
      <p className="font-medium text-sm">Upload File</p>
      <p className="text-custom-gray-scale-400 text-xs font-light mt-1 ">
        Maximum file is 10mb, format is CSV, xlsv.
      </p>

      <div className="flex flex-col justify-between mt-5">
        <div className="flex  items-center">
          <p className="font-medium text-[13px] w-[70px]">CSV file</p>

          <div className="flex justify-between p-3 pl-5 pr-7 items-center w-full bg-custom-light-gray border rounded-sm border-custom-divider">
            <p className="text-custom-dark-gray text-xs font-light truncate  w-40">
              {uploadedFile ?? "no file selected"}
            </p>
            <Input
              type="file"
              id="file-upload"
              name="file-upload"
              accept=".csv, .xlsx"
              className="hidden"
              onChange={handleFileChange}
              // onChange={(e) => {
              //   // @ts-ignore
              //   const file = e.target?.files[0] 
              //  handleUploadTest(file)
              // }}
            />
            <label
              htmlFor={"file-upload"}
              className="text-primary font-medium text-xs cursor-pointer"
            >
              {uploadedFile ? "change file" : "choose file"}
            </label>
          </div>
        </div>

        <p className="mt-5 font-light text-sm text-custom-gray-scale-400">
          download{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={onSampleCsvDownload}
          >
            sample csv
          </span>{" "}
          and{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={onSampleExcelDownload}
          >
            sample xlsv
          </span>{" "}
          template
        </p>
        {btnGroup}
      </div>
    </div>
  );
};

export default BulkUploadModal;
