import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import useDisclosure from "@/utils/hooks/useDisclosure";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import * as yup from "yup";
import { Textarea } from "@/components/ui/textarea";

interface ImpliedTaskProps {
  formik?: any;
  impliedTaskData?: any[];
  setShowHistory: (item: any) => void;
  setShowComment: (item: any) => void;
}
const formSchema = yup.object().shape({
  reason: yup
    .string()
    .min(2, "reason for rejection is required")
    .required("reason for rejection is required"),
});

const ImpliedTaskApproval = ({
  formik,
  impliedTaskData,
  setShowHistory,
  setShowComment,
}: ImpliedTaskProps) => {
  const handleSubmit = () => {
    console.log("djkdj", rejectFormik.values);
  };

  const rejectFormik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });
  const {
    isOpen: openAcceptModal,
    open: onOpenAcceptModal,
    close: closeAcceptModal,
  } = useDisclosure();

  const {
    isOpen: openCancelModal,
    open: onOpenCancelModal,
    close: closeCancelModal,
  } = useDisclosure();

  return (
    <div className="grid gap-y-10">
      {impliedTaskData?.map((item, idx) => (
        <div key={idx}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-x-1">
              <DotFilledIcon />{" "}
              <p className="capitalize text-[.9rem] font-[500]">{item.title}</p>
            </span>
            <span className="items-center gap-x-1 text-[#5A5B5F] text-sm hidden">
              Percent Completed:
              <p className="text-base font-semibold text-red-500">
                {" "}
                {item.percent}%{" "}
              </p>
            </span>
          </div>
          <div className="mt-7 flex gap-x-3">
            <div className="w-full">
              <div className="flex">
                <p className="w-[36%] font-[400] text-sm">Name of Task</p>
                <p className="w-[16%] font-[400] text-sm">Weight</p>
                <p className="w-[40%] font-[400] text-sm">Resource</p>
              </div>
              <hr className="my-3" />
              {item.task.map((item: any, idx: any) => (
                <div key={idx} className="flex">
                  <p className="w-[36%] font-[200] text-xs">{item.name}</p>
                  <p className="w-[16%] font-[200] text-xs">{item.weight}%</p>
                  <p className="w-[40%] font-[200] text-xs">
                    {item.resources.join(", ")}
                  </p>
                </div>
              ))}
              <div className="flex gap-x-3 mt-8">
                <Button
                  className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                  onClick={() => setShowHistory(true)}
                >
                  View History
                </Button>
                <Button
                  className="text-[#6E7C87] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                  onClick={() => setShowComment(true)}
                >
                  Comments
                  <CommentsIcon />
                </Button>
              </div>
            </div>
            <div className="border grid gap-y-5 border-[#E5E9EB] rounded-sm w-full py-5 px-4">
              <Input
                label="Jan Expected Outcome (Monthly)"
                id="expected"
                name="expected"
                value={item.expectedOutcome}
                onChange={formik.handleChange}
                touched={formik.touched.expected}
                error={formik.errors.expected}
                placeholder="Input Expected Outcome"
                disabled
                labelColor="text-black text-[.9rem]"
              />
              <Input
                label="Actual Outcome"
                id="actual_outcome"
                name="actual_outcome"
                value={formik.values.actual_outcome}
                onChange={formik.handleChange}
                touched={formik.touched.actual_outcome}
                error={formik.errors.actual_outcome}
                placeholder="Input Actual Outcome"
                labelColor="text-black text-[.9rem]"
              />
              <div>
                <Input
                  label="Percentage Completion"
                  id=" percentage_completion"
                  name=" percentage_completion"
                  value={formik.values.percentage_completion}
                  onChange={formik.handleChange}
                  touched={formik.touched.percentage_completion}
                  error={formik.errors.percentage_completion}
                  placeholder="Input Percentage"
                  labelColor="text-black text-[.9rem]"
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={onOpenAcceptModal}>Accept</Button>
                <Button
                  variant="outline"
                  className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                  onClick={onOpenCancelModal}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
          {idx === impliedTaskData.length - 1 ? (
            ""
          ) : (
            <hr className="mt-[1.4375rem]" />
          )}
        </div>
      ))}

      <ModalContainer
        show={openAcceptModal}
        handleClose={closeAcceptModal}
        modalClass="h-[220px] !w-[540px] rounded "
        title="Close Subsidairy"
      >
        <div className="absolute top-0 text-right flex flex-col gap-[2rem]">
          <div className="  w-full p-4 px-6 ">
            <div className="flex justify-between items-center mt-3 mb-[18px]">
              <h4 className="">Approve?</h4>
              <X
                className="size-[18px] cursor-pointer text-[var(--bg-red-100)]"
                onClick={closeAcceptModal}
              />
            </div>
            <div>
              <div>
                <p className="text-[var(--text-color4)] text-sm text-left ">
                  Are you sure you want to approve this submission, approving
                  will send this submission to the next approval line, press the
                  button below to proceed
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full items-end justify-end ">
              <Button
                onClick={closeAcceptModal}
                loading={false}
                disabled={false}
                className={cn(
                  "font-light mt-5 bg-transparent border-primary text-primary border "
                )}
                size="sm"
              >
                Review Inputs
              </Button>
              <Button loading={false} disabled={false} size="sm">
                Yes, Submit
              </Button>
            </div>
          </div>
        </div>
      </ModalContainer>

      <ModalContainer
        show={openCancelModal}
        handleClose={closeCancelModal}
        modalClass="h-[400px] !w-[540px] rounded "
        title="Close Subsidairy"
      >
        <div className="absolute top-0 text-left flex flex-col gap-[2rem]">
          <div className="  w-full p-4 px-6 ">
            <div className="flex justify-between items-center mt-3 mb-[18px]">
              <h4 className="text-[var(--bg-red-100)]">Reject Submission</h4>
              <X
                className="size-[18px] cursor-pointer text-[var(--bg-red-100)]"
                onClick={closeCancelModal}
              />
            </div>

            <div>
              <div className="flex flex-col gap-4">
                <div>
                  <Textarea
                    label="Reason for Rejection"
                    rows={5}
                    id="reason"
                    name="reason"
                    placeholder="Reason for Rejection"
                    className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
                    onChange={rejectFormik.handleChange}
                    touched={rejectFormik.touched.reason}
                    value={rejectFormik.values.reason}
                    error={rejectFormik.errors.reason}
                    labelColor="text-black text-[.9rem]"
                  />
                </div>
                <div>
                  <p className="text-[var(--text-color4)] text-sm text-left ">
                    You’re about to reject this submission. This action will
                    send a notification to the user with your comment Press the
                    button below to proceed?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full items-end justify-end ">
              <Button
                size="sm"
                onClick={closeCancelModal}
                loading={false}
                disabled={false}
                className={cn(
                  "font-light mt-5 bg-transparent border-primary text-primary border "
                )}
              >
                No
              </Button>
              <Button
                size="sm"
                loading={false}
                disabled={false}
                variant="outline"
                className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                onClick={handleSubmit}
              >
                Yes, Reject
              </Button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ImpliedTaskApproval;
