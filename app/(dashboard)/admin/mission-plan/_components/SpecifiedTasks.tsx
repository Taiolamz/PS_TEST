import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  title: string;
};

const SpecifiedTasks = ({ title }: Props) => {
  return (
    <section className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
      <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
        {title}
      </h2>
      <div className="mt-2">
        <h3 className="text-lg font-medium">
          - Achieve $500 million at the end of the 2nd quarter
        </h3>
        <div className="flex justify-between items-end">
          <div className="ml-4 mb-2.5 flex flex-col gap-[0.3125rem]">
            <p className="mt-2">
              <span className="font-semibold">Pillars:</span>Prouct, Brand,
              People.
            </p>
            <p className="mt-1">
              <span className="font-semibold">Measures of success:</span>{" "}
              Measure 1, Measure 2, Measure 3
            </p>
            <p className="mt-1">
              <span className="font-semibold">
                22nd July 2022 - 15th Dec 2022
              </span>
            </p>
          </div>
          <div className="flex gap-2.5 items-end">
            <div className="mr-2">
              <label className="text-[0.8125rem] text-[#6E7C87]">
                Input Weight
              </label>
              <Input placeholder="Input weight" />
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
    </section>
  );
};

export default SpecifiedTasks;
