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
  link: Yup.string().url("Invalid URL").required("Link is required"),
  files: Yup.array().min(1, "At least one file is required"),
});

export default function AttachmentModal({
  show,
  handleClose,
  modalClass,
  id,
}: ReportChallengeModalProps) {
  const [files, setFiles] = useState([]);

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
      <form className="px-7 py-5 h-[392px] max-h-[84vh] overflow-auto relative">
        <label htmlFor="" className="">
          <p className="">Add Attachment</p>
          <p className="">
            Add a supporting document toward your actual outcome. Selected
            document will be seen by approvers
          </p>
        </label>
        AttachmentModal
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
            onClick={handleSubmit}
            className={cn("font-light rounded")}
          >
            Upload
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
