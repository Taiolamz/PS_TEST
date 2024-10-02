import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
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
    <div className="grid gap-y-10">
      {impliedTaskData?.map((item, idx) => (
        <div key={idx}>
          {idx > 0 && <hr />}
          <div
            className={`flex items-center justify-between ${idx > 0 && "mt-7"}`}
          >
            <span className="flex items-center gap-x-1">
              <DotFilledIcon />{" "}
              <p className="text-[#1E1E1E] capitalize">{item.title}</p>
            </span>
            <span className="flex gap-x-1">
              Approval Status:
              <p className="text-sm font-semibold text-[#FFC043]">
                {" "}
                {item.approvalStatus}{" "}
              </p>
            </span>
            <span className="flex items-center gap-x-1 text-[#1E1E1E] text-sm">
              Percent Completed:
              <p className="text-base font-semibold text-red-500">
                {" "}
                {item.percent}%{" "}
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
              {item.task.map((item: any, idx: any) => (
                <div key={idx} className="flex gap-x-2">
                  <p className="w-[36%] text-[#222222da] text-xs">
                    {item.name}
                  </p>
                  <p className="w-[16%] text-[#222222da] text-xs">
                    {item.weight}%
                  </p>
                  <p className="w-[40%] text-[#222222da] text-xs">
                    {item.resources.join(", ")}
                  </p>
                </div>
              ))}
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
                label="Jan Expected Outcome (Monthly)"
                id="expected"
                name="expected"
                value={item.expectedOutcome}
                onChange={formik.handleChange}
                touched={formik.touched.expected}
                error={formik.errors.expected}
                placeholder="Input Expected Outcome"
                disabled
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
              />
              <div className="flex flex-wrap items-center gap-x-2">
                <Input
                  label="My Contribution"
                  id="contribution"
                  name="contribution"
                  value={formik.values.contribution}
                  onChange={formik.handleChange}
                  touched={formik.touched.contribution}
                  error={formik.errors.contribution}
                  placeholder="Input Contribution"
                />
                <Button className="flex items-center gap-x-1 mt-6 bg-transparent shadow-none p-0 text-xs">
                  <p className="text-[var(--primary-color)]">Attach</p>
                  <MdOutlineAttachment color="var(--primary-color)" size={18} />
                </Button>
                <Button
                  onClick={() => setShowChallengeModal(true)}
                  className="bg-transparent shadow-none p-0 underline text-[var(--primary-color)] mt-6 text-xs"
                >
                  Report Challenge
                </Button>
              </div>
              <div className="">
                <p className="block relative text-xs  text-[#6E7C87] font-normal pb-2">
                  Downline expectation
                </p>
                <div className="grid grid-cols-2 gap-x-2 justify-between">
                  {item.downlineExpectations.map((item: any, idx: number) => (
                    <Input
                      label={item.name}
                      key={idx}
                      id="expected_outcome"
                      name="expected_outcome"
                      value={item.value}
                      onChange={formik.handleChange}
                      touched={formik.touched.expected_outcome}
                      error={formik.errors.expected_outcome}
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
