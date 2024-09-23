import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";

interface ReusableDrawerProps {
  show?: boolean;
  closeOnClickOutside?: boolean;
  children?: React.ReactNode;
  title?: string;
  handleClose?: () => void;
  width?: number;
  
}

export default function ReusableDrawer({
  show,
  title,
  children,
  handleClose,
  width,
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
          <div  className="pt-4 flex justify-between items-center relative lg:mx-5">
            <SheetTitle className="text-sm font-normal text-black">
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
