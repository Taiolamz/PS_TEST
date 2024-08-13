import { ReusableDrawer } from "@/components/fragment";
import React from "react";

export default function DrawerApprovalStatus({
  show,
  handleClose,
  userId,
}: {
  show: boolean;
  handleClose: () => void;
  userId: string;
}) {
  return (
    <ReusableDrawer
      title="Approval Status"
      show={show}
      handleClose={handleClose}
      closeOnClickOutside={false}
    >
      <p>pppp{userId}</p>
    </ReusableDrawer>
  );
}
