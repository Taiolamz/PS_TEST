import { Button } from "@/components/ui/button";
import React from "react";

const DeleteSpecifiedTaskModal = ({
  onReAssign,
  onDelete,
  data,
}: {
  onReAssign: () => void;
  onDelete: () => void;
  data: any;
}) => {
  return (
    <div className="p-3 flex flex-col gap-3">
      <p className="text-[#EC1410] font-medium text-[16px]">
        Delete  {data?.task ? (
          <span className="text-primary">{`(${data?.task})`}</span>
        ) : null}{" "} Specified Task
      </p>
      <p className="text-[#5B6871] text-[15px] font-normal">
        You’re about to delete this Specified task. Would you like to re-assign
        the implied task to another specified task , without reassigning would
        erase all information about this task. Do you still want to delete?
      </p>
      <div className="flex gap-3 items-center mt-5 justify-end">
        <Button
          variant="outline"
          className="border-primary text-primary"
          onClick={onReAssign}
        >
          Reassign
        </Button>
        <Button className="!bg-[#EC1410]" onClick={onDelete}>
          Yes, Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteSpecifiedTaskModal;
