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
        <div className="font-normal mx-6 mt-5 flex justify-between items-center text-[var(--text-color3)]">
          {title}
          <span
            onClick={onClose}
            className="size-6 grid place-content-center rounded-full bg-[var(--btn-light-color)]"
          >
            <X className="h-4 w-4" />
          </span>
        </div>
        <hr className="mt-5 border-[var(--input-border)]" />
        {children}
      </SheetContent>
    </Sheet>
  );
}
