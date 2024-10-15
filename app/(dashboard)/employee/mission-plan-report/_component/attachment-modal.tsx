import CustomSelect from "@/components/custom-select";
import Icon from "@/components/icon/Icon";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAddChallangeMutation } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";

interface ReportChallengeModalProps {
  show: boolean;
  handleClose: () => void;
  modalClass?: string;
  id?: string;
}
const validationSchema = Yup.object({
  link: Yup.string().url("Invalid URL").optional(),
  files: Yup.array().optional().min(1, "At least one file is required"),
});

export default function AttachmentModal({
  show,
  handleClose,
  modalClass,
  id,
}: ReportChallengeModalProps) {
  const [files, setFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      link: "",
      files: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      values.files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("link", values.link);

      //   // Make your API call with formData
      //   try {
      //     const response = await fetch("/upload", {
      //       method: "POST",
      //       body: formData,
      //     });
      //     console.log(await response.json());
      //   } catch (error) {
      //     console.error("Error uploading files", error);
      //   }
    },
  });

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = () => {};
  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      title="Challenges"
      modalClass={cn(
        "rounded-md bg-white md:w-[480px] md:max-w-[480px] lg:w-[530px] lg:max-w-[530px] pb-0",
        modalClass
      )}
      hasCloseButton={false}
    >
      <form className="px-7 py-5 h-[396px] max-h-[84vh] overflow-auto relative">
        <label htmlFor="" className="space-y-1">
          <p className="text-sm font-medium">Add Attachment</p>
          <p className="text-[10px] text-[var(--text-color)]">
            Add a supporting document toward your actual outcome. Selected
            document will be seen by approvers
          </p>
        </label>
        {/* Drag and Drop for Files */}
        <div
          {...getRootProps()}
          className={cn(
            `border-dashed h-[128px] w-full border-[var(--input-border)] my-2 place-content-center border`,
            isDragActive ? "bg-[var(--primary-accent-color)]" : " bg-[#f7f9fa]"
          )}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center space-x-3">
              <p className="text-xs text-[var(--text-color4)]">
                Drag the file here...
              </p>
            </p>
          ) : (
            <p className="text-center space-x-3">
              <p className="text-sm font-medium text-[var(--text-color)]">
                Doc upload.csv
              </p>
              <p className="text-xs text-[var(--primary-accent-color)]">
                Drag file here
              </p>
            </p>
          )}
        </div>

        <label htmlFor="" className="space-y-1">
          <p className="text-sm font-medium">Add Link</p>
          <p className="text-[10px] text-[var(--text-color)]">
            Add a link instead of a document if necessary
          </p>
        </label>
        <Input
          type="url"
          name="link"
          id="link"
          value={formik.values.link}
          onChange={formik.handleChange}
          placeholder="Input link/url"
          touched={true}
          error={formik?.errors?.link}
        />
        <div className="flex justify-end items-end space-x-4 mt-6">
          <Button
            onClick={handleClose}
            disabled={false}
            variant={"outline"}
            type="button"
            className={cn(
              "font-light rounded border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[var(--primary-accent-color)]"
            )}
          >
            Cancel
          </Button>
          <Button
            loading={false}
            loadingText="Upload"
            disabled={false}
            type="submit"
            className={cn("font-light rounded")}
          >
            Upload
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
