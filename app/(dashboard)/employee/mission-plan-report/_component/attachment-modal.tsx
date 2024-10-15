import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useAddTaskAttachmentMutation } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";

interface ReportChallengeModalProps {
  show: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
  modalClass?: string;
  id?: string;
}
const validationSchema = Yup.object({
  link: Yup.string().url("Invalid URL").optional(),
});

export default function AttachmentModal({
  show,
  handleClose,
  modalClass,
  id,
  handleSuccess,
}: ReportChallengeModalProps) {
  const [addTaskAttachment, { isLoading: sending }] =
    useAddTaskAttachmentMutation();

  const formik = useFormik<{ link: string; files: File | null }>({
    initialValues: {
      link: "",
      files: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      if (id) {
        formData.append("task_outcome_id", id);
      }
      if (values.files) {
        formData.append("files", values.files);
      }
      if (values.link) {
        formData.append("link", values.link);
      }

      addTaskAttachment(formData)
        .unwrap()
        .then(() => {
          handleSuccess();
          handleClose();
        })
        .catch(() => {});
    },
  });
  useEffect(() => {
    if (show) {
      formik.resetForm();
    }
  }, [show]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      formik.setFieldValue("files", acceptedFiles[0]);
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
  });

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
      <form
        onSubmit={formik.handleSubmit}
        className="px-7 py-5 h-[396px] max-h-[84vh] overflow-auto relative"
      >
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
            <div className="text-center space-x-3">
              <p className="text-xs text-[var(--text-color4)]">
                Drag the file here...
              </p>
            </div>
          ) : (
            <div className="text-center space-x-3">
              {formik.values.files ? (
                <p className="text-sm font-medium text-[var(--text-color)]">
                  {formik?.values?.files?.name}
                </p>
              ) : (
                <p className="text-sm font-medium text-[var(--text-color)]">
                  Doc upload.csv
                </p>
              )}
              <p className="text-xs text-[var(--primary-accent-color)]">
                Drag file here
              </p>
            </div>
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
            loading={sending}
            loadingText="Upload"
            disabled={!formik?.isValid || !formik.dirty || sending}
            className={cn("font-light rounded")}
          >
            Upload
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
