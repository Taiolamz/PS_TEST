import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";

const DashboardModal = ({
  open,
  children,
  className,
  onOpenChange,
}: DashboardModalType) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};

export default DashboardModal;
