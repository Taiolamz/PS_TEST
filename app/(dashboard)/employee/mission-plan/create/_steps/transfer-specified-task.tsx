import { Button } from "@/components/ui/button";
import React from "react";

const TransferSpecifiedTask = ({
  onTaskWeightTransfer,
  onTaskTransfer,
  data,
}: {
  onTaskWeightTransfer: () => void;
  onTaskTransfer: () => void;
  data: any;
}) => {
  return (
    <div className="p-3 flex flex-col gap-3">
      <p className="text-[#EC1410] font-medium text-[16px]">
        Transfer{" "}
        {data?.task ? (
          <span className="text-primary">{`(${data?.task})`}</span>
        ) : null}{" "}
        Specified Task
      </p>
      <p className="text-[#5B6871] text-[15px] font-normal">
        You’re about to transfer your specified task, select if you will like to
        transfer your implied task and weight or just your implied task
      </p>
      <div className="flex gap-3 items-center mt-5 justify-end">
        <Button
          variant="outline"
          className="border-primary text-primary"
          onClick={onTaskWeightTransfer}
        >
          Transfer Implied task & weight
        </Button>
        <Button className="!bg-primary" onClick={onTaskTransfer}>
          Transfer Implied task
        </Button>
      </div>
    </div>
  );
};

export default TransferSpecifiedTask;
