"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Comment from "./comment";
import { formatToReadableDate } from "@/utils/helpers/date-formatter";
import { formatNamesWithCommas } from "@/utils/helpers/format-names-with-commas";
import { SpecifiedTasksType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";

type Props = {
  data: SpecifiedTasksType[];
  approvables?: [];
};

const ImpliedTask = ({ data, approvables }: Props) => {
  const approvableTypeId = data
    ?.map((item) => item.implied_tasks?.map((task) => task.id))
    ?.flat();
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const comments = useGetComments({ approvables, approvableTypeId });
  const initialActionType = "";

  const approval_type = "implied-task";

  const {
    openCommentId,
    toggleComment,
    handleReject,
    handleApprove,
    FormikApprovalForm,
  } = useApproval({
    initialComments: comments?.comment ?? [],
    initialActionType,
    missionplanid,
    approval_type,
  });
  return (
    <div className="flex flex-col gap-10">
      {data?.map((specifiedTask, index1) => (
        <React.Fragment key={specifiedTask.id}>
          {specifiedTask?.implied_tasks?.map((item, index2) => (
            <section key={item?.id}>
              <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm">
                <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
                  Implied Task {index1 + 1}
                </h2>
                <div className="mt-5 ml-1.5">
                  <h3 className="font-medium">- {item?.task}</h3>
                  <div className="flex justify-between items-end">
                    <div className="ml-3 flex flex-col gap-[0.3125rem]">
                      <p className="mt-2 font-light">
                        <span className="font-normal">Specified Task : </span>{" "}
                        {specifiedTask?.task}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Expected Outcome : </span>{" "}
                        {item?.expected_outcome}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Weight : </span>{" "}
                        {item?.weight}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Percentage : </span>{" "}
                        {item?.percentage}%
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Resources : </span>{" "}
                        {/* {item?.resources?.map((item) => (
                          <span key={item?.staff_member_id}>
                            {item?.name},{" "}
                          </span>
                        ))}{" "} */}
                        <span key={item?.id}>
                          {formatNamesWithCommas(item?.resources, "name")}
                        </span>
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">
                          {" "}
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
                          id="input_weight"
                          name="input_weight"
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
                label="Implied Task"
                showTextArea={openCommentId === item.id}
                setShowTextArea={() => toggleComment(item.id)}
                comments={comments}
                formik={FormikApprovalForm}
              />
            </section>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ImpliedTask;
