import { ReusableDrawer } from "@/components/fragment";
import React from "react";

export default function DrawerComment({
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
      title="Comment"
      show={show}
      handleClose={handleClose}
      closeOnClickOutside={false}
    >
      <p>pppp{userId}</p>
    </ReusableDrawer>
  );
}
