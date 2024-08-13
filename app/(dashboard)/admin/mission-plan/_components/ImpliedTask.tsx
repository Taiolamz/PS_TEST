"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Comment from "./comment";

type Props = {
  title: string;
};

const ImpliedTask = ({ title }: Props) => {
  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
        <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
          {title}
        </h2>
        <div className="mt-2">
          <h3 className="text-lg font-medium">- Commercialize 4 products</h3>
          <div className="flex justify-between items-end">
            <div className="ml-4 flex flex-col gap-[0.3125rem]">
              <p className="mt-2">
                <span className="font-semibold">Specified Task:</span> Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <p className="mt-1">
                <span className="font-semibold">Expected Outcome:</span> simply
                dummy text of the printing
              </p>
              <p className="mt-1">
                <span className="font-semibold">Weight:</span> simply dummy text
                of the printing
              </p>
              <p className="mt-1">
                <span className="font-semibold">Percentage:</span> simply dummy
                text of the printing
              </p>
              <p className="mt-1">
                <span className="font-semibold">Resource:</span> simply dummy
                text of the printing
              </p>
              <p className="mt-1">
                <span className="font-semibold">
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
                className="border-[#FF5855] text-[#FF5855]"
              >
                Reject
              </Button>
              <Button>Approve</Button>
            </div>
          </div>
        </div>
      </div>
      <Comment label="Implied Task" />
    </section>
  );
};

export default ImpliedTask;
