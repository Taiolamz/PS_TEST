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
    0: { name: "name", required: true, key: "name" },
    1: { name: "head", required: false, key: "head" },
    2: { name: "state", required: true, key: "state" },
    3: { name: "address", required: true, key: "address" },
    4: { name: "country", required: true, key: "country" },
    5: { name: "work_email", required: false, key: "work_email" },
    6: { name: "subsidiary", required: false, key: "subsidiary" },
  };
  const tableHeadlist = [
    "Name",
    "Head of Department",
    "State",
    "Address",
    "Country",
    "Work email",
    "Subsidiary",
  ];
  const [tableBodyList, setTableBodyList] = useState<any>([]);
  const [validFormat, setValideFormat] = useState(false);
  const handleUploadTest = async (e: any) => {
    const data = await getDataFromFileUpload(e, expectedFormat, 200);
    // console.log(data);
    if (data?.status === "failed") {
      toast.error(data?.message);
      setValideFormat(false);
      setTableBodyList([]);
      setValideFormat(false);
      setUploadedFile("");
    }
    if (data?.status === "success") {
      setTableBodyList(data?.array);
      setValideFormat(true);
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
    <div className={tableBodyList?.length > 0 ? `w-[900px]` : "w-[600px]"}>
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
      {/* table start here  */}
      {tableBodyList?.length > 0 && (
        <>
          <div className="preview-reusable-box-table">
            {" "}
            <TableWrapper
              TableTitle={`Preview Branch${
                tableBodyList?.length > 1 ? "es" : ""
              } ( ${tableBodyList?.length} )`}
              tableBodyList={replaceEmptyValuesWithPlaceholder(
                tableBodyList,
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
