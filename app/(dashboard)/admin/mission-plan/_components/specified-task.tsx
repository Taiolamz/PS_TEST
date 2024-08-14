import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Comment from "./comment";

type Props = {
  data: [];
};

const SpecifiedTasks = ({ data }: Props) => {
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>(
    {}
  );

  console.log({ openComments });

  const toggleComment = (id: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="flex flex-col gap-10">
      {data?.map((item) => (
        <section key={item?.id}>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm">
            <h2 className="text-primary text-sm mb-[0.6875rem] font-medium">
              {item?.title}
            </h2>
            <div className="mt-5 ml-1.5">
              <h3 className="font-medium">- {item?.specifiedTask}</h3>
              <div className="flex justify-between items-end">
                <div className="ml-3 mb-2.5 flex flex-col gap-[0.3125rem]">
                  <p className="mt-2 font-light">
                    <span className="font-normal">Pillars: </span>
                    {item.pillars}.
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">Measures of success:</span>{" "}
                    {item?.measureOfSuccess}
                  </p>
                  <p className="mt-1">
                    <span className="font-normal">
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
                      name="input_weight"
                      id="input_weight"
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
            label="Specified task"
            showTextArea={!!openComments[item.id]}
            setShowTextArea={() => toggleComment(item.id)}
          />
        </section>
      ))}
    </div>
  );
};

export default SpecifiedTasks;
