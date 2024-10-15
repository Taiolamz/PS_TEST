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
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  // Handle file changes
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    formik.setFieldValue("files", selectedFiles);
  };

  // Handle file drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);
    setFiles(reorderedFiles);
    formik.setFieldValue("files", reorderedFiles);
  };

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

        <input
          type="file"
          onChange={handleFileChange}
          multiple
          accept=".csv,.pdf,.docx,.png,.jpg"
        />
        {formik.errors.files && <div>{formik.errors.files}</div>}

        {/* Drag and Drop for Files */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="files-droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="border-dashed h-[128px] w-full border-[var(--input-border)] my-2 bg-[#f7f9fa] border"
              >
                {files.map((file, index) => (
                  <Draggable
                    key={file.name}
                    draggableId={file.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          marginBottom: "8px",
                          padding: "8px",
                          border: "1px solid #ccc",
                          backgroundColor: "#fafafa",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {file.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="border-dashed h-[128px] w-full border-[var(--input-border)] my-2 bg-[#f7f9fa] border"></div>

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
