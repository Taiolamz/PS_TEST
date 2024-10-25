"use client";
import { ManceLoader } from "@/components/custom-loader";
import TableWrapper from "@/components/tables/TableWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  extractNamesFromFormat,
  replaceEmptyValuesWithPlaceholder,
} from "@/utils/helpers";
import { getDataFromFileUpload } from "@/utils/helpers/extract-data-bulk";
// import { getDataFromFileUpload } from "@/utils/helpers/TextExtract";
import React, { useState } from "react";
import { toast } from "sonner";

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
      handleUploadTest(file);
    } else {
      !uploadedFile && setUploadedFile(null);
    }
  };

  const expectedFormat = {
    0: { name: "First Name", required: true, key: "first_name" },
    1: { name: "Middle  Name", required: false, key: "middle_name" },
    2: { name: "Maiden Name", required: false, key: "maiden_name" },
    3: { name: "Last Name", required: true, key: "last_name" },
    4: { name: "Gender", required: false, key: "gender" },
    5: { name: "Date of Birth", required: false, key: "dob" },
    6: { name: "Resumption Date", required: false, key: "resumption_date" },
    7: { name: "Work Email", required: true, key: "work_email" },
    8: { name: "Grade Level", required: true, key: "grade_level" },
    9: {
      name: "Line Manager Email",
      required: true,
      key: "line_manager_email",
    },
    10: { name: "Subsidiary", required: true, key: "subsidiary" },
    11: { name: "Branch", required: true, key: "branch" },
    12: { name: "Department", required: false, key: "department" },
    13: { name: "Unit", required: false, key: "unit" },
    14: { name: "Job Title", required: false, key: "job_title" },
    15: { name: "Phone Number", required: false, key: "phone_number" },
    16: { name: "Staff Number", required: false, key: "staff_number" }, 
    17: { name: "Role", required: true, key: "role" },
    18: { name: "New Employee", required: false, key: "new_employee" },
  };
  // const tableHeadlist = [
  //   "Name",
  //   "Head of Unit",
  //   "Subsidiary",
  //   "Branch",
  //   "Department",
  // ];
  const [tableBodyList, setTableBodyList] = useState<any>([]);
  const [validFormat, setValideFormat] = useState(false);

  const handleUploadTest = async (e: any) => {
    const data = await getDataFromFileUpload(e, expectedFormat, 200);
    // console.log(data);
    if (data?.status === "failed") {
      toast.error(data?.message);
      // setValideFormat(false);
      setTableBodyList([]);
      setValideFormat(false);
      setUploadedFile("");
    }
    if (data?.status === "success") {
      // console.log(data?.array);

      setTableBodyList(data?.array);
      setValideFormat(true);
    }
  };

  const formatTableList = (list: any) => {
    if (list?.length > 0) {
      const newList = list.map((chi: any) => {
        return { ...chi, new_employee: chi?.new_employee ? "TRUE" : "FALSE" };
      });
      return newList;
    }
  };

  const handleCancelUpload = () => {
    // handleBulkUploadDialog();
    setTableBodyList([]);
    setValideFormat(false);
    onCancel();
    setUploadedFile("");
  };

  const btnClass =
    "font-normal py-0 px-4 h-[32px]  transition-all duration-300 ";
  const btnGroup = (
    <div className="flex gap-3 justify-end mt-10  items-center">
      <Button
        variant="outline"
        className={`border-primary text-primary hover:bg-transparent font-light  hover:text-primary ${btnClass}`}
        onClick={handleCancelUpload}
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
          disabled={!uploadedFile || !validFormat}
        >
          {loading ? <ManceLoader /> : "Upload"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={tableBodyList?.length > 0 ? `w-[1200px]` : "w-[600px]"}>
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
          Download{" "}
          {/* <span
            className="text-primary cursor-pointer"
            onClick={onSampleCsvDownload}
          >
            sample csv
          </span>{" "}
          and{" "} */}
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
      {/* table start here  */}
      {tableBodyList?.length > 0 && (
        <>
          <div className="preview-reusable-box-table">
            {" "}
            <TableWrapper
              TableTitle={`Preview Unit${
                tableBodyList?.length > 1 ? "s" : ""
              } ( ${tableBodyList?.length} )`}
              tableBodyList={replaceEmptyValuesWithPlaceholder(
                formatTableList(tableBodyList),
                "-----"
              )}
              hideSearchFilterBox
              tableheaderList={extractNamesFromFormat(expectedFormat)}
              hidePagination
            />
          </div>
        </>
      )}
      {/* table start end */}
    </div>
  );
};

export default BulkUploadModal;
