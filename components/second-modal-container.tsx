import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

interface ModalContainerProps {
  title?: string | React.ReactNode;
  show: boolean;
  hasCloseButton?: boolean;
  handleClose?: () => void;
  children?: React.ReactNode;
  modalClass?: string;
}

export default function SecondModalContainer({
  show,
  handleClose,
  children,
  modalClass,
  title,
}: ModalContainerProps) {
  return (
    <>
      <AlertDialog open={show}>
        <AlertDialogContent
          className={cn("md:w-[27rem] rounded-none pb-6 bg-white", modalClass)}
        >
          <div className="bg-[var(--input-bg)] px-6 py-3 flex justify-between items-center">
            <h3 className="text-[var(--text-color3)] font-medium text-lg">
              {title}
            </h3>
            <span
              className="cursor-pointer text-[var(--error-color)]"
              onClick={handleClose}
            >
              <X width={17} height={17} />
            </span>{" "}
          </div>
          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
