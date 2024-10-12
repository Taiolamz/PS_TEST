import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CommentsIcon from "@/public/assets/icons/comments";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { MdOutlineAttachment } from "react-icons/md";
import Icon from "react-multi-date-picker/components/icon";

interface ImpliedTaskProps {
  formik?: any;
  impliedTaskData?: any[];
  setShowHistory: (item: any) => void;
  setShowComment: (item: any) => void;
  setShowChallengeModal: (item: any) => void;
}

const ImpliedTask = ({
  formik,
  impliedTaskData,
  setShowHistory,
  setShowComment,
  setShowChallengeModal,
}: ImpliedTaskProps) => {
  return (
    <div className="grid mt-8">
      {impliedTaskData?.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "py-5 px-8",
            item?.status?.toLowerCase() === "rejected"
              ? "bg-[var(--bg-red-100-op)]"
              : ""
          )}
        >
          {idx > 0 && <hr />}
          <div
            className={`flex items-center justify-between ${idx > 0 && "mt-7"}`}
          >
            <span className="flex items-center gap-x-1">
              <DotFilledIcon />
              <p className="text-[#1E1E1E] capitalize">{item?.task}</p>
            </span>
            <span className="flex gap-x-1 items-center">
              Approval Status:
              <span
                className={cn(
                  "font-medium text-[#FFC043] text-xs capitalize",
                  item?.status?.toLowerCase() === "approved"
                    ? "text-[rgb(var(--bg-green-100))]"
                    : item?.status?.toLowerCase() === "rejected"
                    ? "text-[var(--error-color)]"
                    : "text-[#FFC043]"
                )}
              >
                {item?.status}
              </span>
            </span>
            <span className="flex items-center gap-x-1 text-[#1E1E1E] text-sm">
              Percent Completed:
              <p className="text-base font-semibold text-red-500">
                {" "}
                {item.percentage}%{" "}
              </p>
            </span>
          </div>
          <div className="mt-7 flex gap-x-3">
            <div className="w-full">
              <div className="flex gap-x-2">
                <p className="w-[36%] text-[#222222ef] text-sm">Name of Task</p>
                <p className="w-[16%] text-[#222222ef] text-sm">Weight</p>
                <p className="w-[40%] text-[#222222ef] text-sm">Resource</p>
              </div>
              <hr className="my-3" />
              <div key={idx} className="flex gap-x-2">
                <p className="w-[36%] text-[#222222da] text-xs">{item?.task}</p>
                <p className="w-[16%] text-[#222222da] text-xs">
                  {item.weight}%
                </p>
                <p className="w-[40%] text-[#222222da] text-xs">
                  {item.resources
                    ?.map((element: any) => element?.name)
                    ?.join(", ")}
                </p>
              </div>
              <div className="flex gap-x-3 mt-8">
                <Button
                  onClick={() => setShowHistory(true)}
                  className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                >
                  View History
                </Button>
                <Button
                  onClick={() => setShowComment(true)}
                  className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                >
                  Comments
                  <CommentsIcon />
                </Button>
              </div>
            </div>
            <div className="border grid gap-y-5 border-[#E5E9EB] rounded-sm w-full py-5 px-4">
              <Input
                label={
                  getCurrentMonth().slice(0, 3) + " Expected Outcome (Monthly)"
                }
                id="expected_task_outcome"
                name="expected_task_outcome"
                value={formik.values.expected_task_outcome}
                onChange={formik.handleChange}
                touched={formik.touched.expected_task_outcome}
                error={formik.errors.expected_task_outcome}
                placeholder="Input Expected Outcome"
              />
              <Input
                label="Actual Outcome"
                id="actual_outcome"
                name="actual_outcome"
                disabled
                // value={formik.values.actual_outcome}
                // onChange={formik.handleChange}
                // touched={formik.touched.actual_outcome}
                // error={formik.errors.actual_outcome}
                placeholder="Input Actual Outcome"
              />
              <div className="flex flex-wrap items-center gap-x-2">
                <Input
                  label="My Contribution"
                  id="contribution"
                  name="contribution"
                  disabled
                  // value={formik.values.contribution}
                  // onChange={formik.handleChange}
                  // touched={formik.touched.contribution}
                  // error={formik.errors.contribution}
                  placeholder="Input Contribution"
                />
              </div>
              <div className="">
                <p className="block relative text-xs  text-[#6E7C87] font-normal pb-2">
                  Downline expectation
                </p>
                <div className="grid grid-cols-2 gap-x-2 justify-between">
                  {item?.resources.map((val: any, idx: number) => (
                    <Input
                      label={`${Math.round(val?.percentage)}% ${val?.name}`}
                      key={idx}
                      id="expected_outcome"
                      name="expected_outcome"
                      // value={val?.value}
                      // onChange={formik.handleChange}
                      // touched={formik.touched.expected_outcome}
                      // error={formik.errors.expected_outcome}
                      placeholder="Input Expected Outcome"
                      disabled
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpliedTask;
