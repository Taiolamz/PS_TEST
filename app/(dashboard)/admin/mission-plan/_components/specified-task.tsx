import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Comment from "./comment";
import { formatToReadableDate } from "@/utils/helpers/date-formatter";
import { formatNamesWithCommas } from "@/utils/helpers/format-names-with-commas";
import { SpecifiedTasksType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";

type Props = {
  data: SpecifiedTasksType[];
};

const SpecifiedTasks = ({ data }: Props) => {
  const { missionplanid } = useParams();
  const initialComments = ["1", "2", "3"]; // wiil be Replaced with actual data
  const initialActionType = "";

  const {
    openCommentId,
    toggleComment,
    handleReject,
    handleApprove,
    FormikApprovalForm,
  } = useApproval(
    initialComments,
    initialActionType,
    missionplanid as string,
    "specified-task"
  );
  console.log("bingo", data);
  return (
    <div className="flex flex-col gap-10">
      {data?.map((item, index) => (
        <section key={item?.id}>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm">
            <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
              Specified Task {index + 1}
            </h2>
            <div className="mt-5 ml-1.5">
              <h3 className="font-medium">{`- ${item?.task} ${
                item?.is_main_effort === 1 ? "(MAIN EFFORT)" : ""
              }`}</h3>
              <div className="flex justify-between items-end">
                <div className="ml-3 mb-2.5 flex flex-col gap-[0.3125rem]">
                  <p className="mt-2 font-light">
                    <span className="font-normal">Pillars : </span>
                    {item?.strategic_pillars.map((item) => (
                      <span key={item?.id}>{item?.title}, </span>
                    ))}
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">Measures of success : </span>{" "}
                    {/* {item?.success_measures?.map((item) => (
                      <span key={item?.id}>{item?.measure}, </span>
                    ))}{" "} */}
                    <span key={item?.id}>
                      {formatNamesWithCommas(
                        item?.success_measures ?? [],
                        "measure"
                      )}
                    </span>
                  </p>
                  <p className="mt-1">
                    <span className="font-normal">
                      {formatToReadableDate(item.start_date)} -{" "}
                      {formatToReadableDate(item?.end_date)}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2.5 items-end">
                  <div className="mr-2">
                    <label className="text-[0.8125rem] text-[#6E7C87]">
                      Input Weight
                    </label>
                    <Input
                      placeholder="Input weight"
                      name="input_weight"
                      id="input_weight"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                    onClick={() => handleReject(item.id)}
                  >
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove()}>Approve</Button>
                </div>
              </div>
            </div>
          </div>
          <Comment
            label="Specified task"
            showTextArea={openCommentId === item.id}
            setShowTextArea={() => toggleComment(item.id)}
            comments={[]}
            formik={FormikApprovalForm}
          />
        </section>
      ))}
    </div>
  );
};

export default SpecifiedTasks;
