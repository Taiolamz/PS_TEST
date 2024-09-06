import { Button } from "@/components/ui/button";
import React from "react";

const DeleteImpliedTaskModal = ({
  onCancel,
  onDelete,
}: {
  onCancel: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="p-3 flex flex-col gap-3">
      <p className="text-[#EC1410] font-medium text-[16px]">
        Delete Implied Task
      </p>
      <p className="text-[#5B6871] text-[15px] font-normal">
        You’re about to delete this implied task. Deleting this, would erase all
        information about this task Do you still want to delete?
      </p>
      <div className="flex gap-3 items-center mt-5 justify-end">
        <Button
          variant="outline"
          className="border-primary text-primary"
          onClick={onCancel}
        >
          No
        </Button>
        <Button className="!bg-[#EC1410]" onClick={onDelete}>
          Yes, Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteImpliedTaskModal;
