"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Comment from "./comment";

type Props = {
  title: string;
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
};

const ImpliedTask = ({ title, showTextArea, setShowTextArea }: Props) => {
  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm">
        <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
          {title}
        </h2>
        <div className="mt-5 ml-1.5">
          <h3 className="font-medium">- Commercialize 4 products</h3>
          <div className="flex justify-between items-end">
            <div className="ml-3 flex flex-col gap-[0.3125rem]">
              <p className="mt-2 font-light">
                <span className="font-normal">Specified Task:</span> Lorem Ipsum
                is simply dummy text of the printing and typesetting industry.
              </p>
              <p className="mt-1 font-light">
                <span className="font-normal">Expected Outcome:</span> simply
                dummy text of the printing
              </p>
              <p className="mt-1 font-light">
                <span className="font-normal">Weight:</span> simply dummy text
                of the printing
              </p>
              <p className="mt-1 font-light">
                <span className="font-normal">Percentage:</span> simply dummy
                text of the printing
              </p>
              <p className="mt-1 font-light">
                <span className="font-normal">Resource:</span> simply dummy text
                of the printing
              </p>
              <p className="mt-1 font-light">
                <span className="font-normal">
                  {" "}
                  22nd July 2022 - 15th Dec 2022
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
  );
};

export default ImpliedTask;
