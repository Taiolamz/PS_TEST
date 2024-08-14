"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Comment from "./comment";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: [];
};

const ImpliedTask = ({ showTextArea, setShowTextArea, data }: Props) => {
  return (
    <div className="flex flex-col gap-10">
      {data?.map((item) => (
        <section key={item?.id}>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm">
            <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
              {item.title}
            </h2>
            <div className="mt-5 ml-1.5">
              <h3 className="font-medium">- {item?.impliedTask}</h3>
              <div className="flex justify-between items-end">
                <div className="ml-3 flex flex-col gap-[0.3125rem]">
                  <p className="mt-2 font-light">
                    <span className="font-normal">Specified Task:</span>{" "}
                    {item?.specifiedTask}
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">Expected Outcome:</span>{" "}
                    {item?.expectedOutcome}
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">Weight:</span> {item?.weight}
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">Percentage:</span>{" "}
                    {item?.percentage}
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">Resource:</span>{" "}
                    {item?.resources}
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">
                      {" "}
                      {item.startDate} - {item.endDate}
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
                    onClick={() => {
                      setShowTextArea(true);
                    }}
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
            showTextArea={showTextArea}
            setShowTextArea={setShowTextArea}
          />
        </section>
      ))}
    </div>
  );
};

export default ImpliedTask;
