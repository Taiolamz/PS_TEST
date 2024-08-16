"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Comment from "./comment";

type StrategicPillarsType = {
  id: string;
  title: string;
};

type ImpliedTaskType = {
  id: string;
  // title: "Implied Task 1";
  task: string;
  expected_outcome: string;
  weight: string;
  percentage: string;
  resources: "Ayomipe, Segun";
  start_date: "22nd July 2022";
  end_date: "22nd July 2022";
};

type Task = {
  id: number;
  task: string;
  specifiedTask: string;
  strategic_pillars: StrategicPillarsType[];
  measure_of_success: string;
  start_date: string;
  end_date: string;
  is_main_effort: number;
  implied_tasks: ImpliedTaskType[];
};
type Props = {
  data: Task[];
};

const ImpliedTask = ({ data }: Props) => {
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);

  const toggleComment = (id: string) => {
    setOpenCommentId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div className="flex flex-col gap-10">
      {data?.map((specifiedTask) => (
        <React.Fragment key={specifiedTask.id}>
          {specifiedTask?.implied_tasks?.map((item) => (
            <section key={item?.id}>
              <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm">
                <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
                  {/* {item.title} */}
                </h2>
                <div className="mt-5 ml-1.5">
                  <h3 className="font-medium">- {item?.task}</h3>
                  <div className="flex justify-between items-end">
                    <div className="ml-3 flex flex-col gap-[0.3125rem]">
                      <p className="mt-2 font-light">
                        <span className="font-normal">Specified Task:</span>{" "}
                        {specifiedTask?.task}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Expected Outcome:</span>{" "}
                        {item?.expected_outcome}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Weight:</span>{" "}
                        {item?.weight}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Percentage:</span>{" "}
                        {item?.percentage}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">Resource:</span>{" "}
                        {/* {item?.resources} */}
                      </p>
                      <p className="mt-1 font-light">
                        <span className="font-normal">
                          {" "}
                          {item.start_date} - {item.end_date}
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
                        onClick={() => toggleComment(item.id)}
                      >
                        Reject
                      </Button>
                      <Button>Approve</Button>
                    </div>
                  </div>
                </div>
              </div>
              <Comment
                label="Implied Task"
                showTextArea={openCommentId === item.id}
                setShowTextArea={() => toggleComment(item.id)}
              />
            </section>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ImpliedTask;
