import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ReusableDrawerProps {
  show?: boolean;
  closeOnClickOutside?: boolean;
  children?: React.ReactNode;
  title?: string;
  handleClose?: () => void;
  width?: number;
  headerClass?: string;
  titleClass?: string;
}

export default function ReusableDrawer({
  show,
  title,
  children,
  handleClose,
  width,
  headerClass,
  titleClass,
  closeOnClickOutside = true,
}: ReusableDrawerProps) {
  return (
    <>
      <Sheet open={show}>
        <SheetContent
          style={{ maxWidth: `${width}px` }}
          onPointerDownOutside={() =>
            closeOnClickOutside && handleClose && handleClose()
          }
        >
          <div
            className={cn(
              "pt-4 flex justify-between items-center relative lg:mx-5",
              headerClass
            )}
          >
            <SheetTitle
              className={cn("text-sm font-normal text-black", titleClass)}
            >
              {title}
            </SheetTitle>
            <span
              className=" w-6 h-6 bg-gray-50 border rounded-[7.92px] grid place-content-center cursor-pointer"
              onClick={handleClose}
            >
              <X className="h-3 w-3" />
            </span>
          </div>
          <section className="py-4">{children}</section>
        </SheetContent>
      </Sheet>
    </>
  );
}
