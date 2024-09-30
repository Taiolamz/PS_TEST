import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { X } from "lucide-react";

export interface CustomDrawerProp {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function CustomDrawer({
  title,
  children,
  open,
  onClose,
}: CustomDrawerProp) {
  return (
    <Sheet open={open}>
      <SheetContent className="w-[380px]">
        <div className="font-normal p-5 flex justify-between items-center bg-primary text-[var(--text-color3)]">
          <span className="text-white"> {title}</span>
          <span
            onClick={onClose}
            className="size-6 grid place-content-center rounded-full cursor-pointer bg-[var(--btn-light-color)]"
          >
            <X className="h-4 w-4" />
          </span>
        </div>
        <hr className="border-[var(--input-border)]" />
        {children}
      </SheetContent>
    </Sheet>
  );
}
