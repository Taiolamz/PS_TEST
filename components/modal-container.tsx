import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle
} from "../components/ui/alert-dialog";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

interface ModalContainerProps {
    title?: string | React.ReactNode;
    show: boolean;
    hasCloseButton?: boolean;
    handleClose?: () => void;
    children?: React.ReactNode;
    modalClass?: string
}

export default function ModalContainer({ show, handleClose, children, modalClass, hasCloseButton = false }: ModalContainerProps) {
    return (
        <>
            <AlertDialog 
                open={show}
            >
                <AlertDialogContent
                    className={cn(
                        "md:w-[27rem]",
                        modalClass
                    )}
                >
                    <AlertDialogDescription>
                        <AlertDialogTitle></AlertDialogTitle>
                    </AlertDialogDescription>
                   {hasCloseButton && <span className="absolute right-4 top-4 cursor-pointer text-[#8F8F8F]"
                        onClick={handleClose}
                    ><X width={17} height={17}/></span>}
                    {children}
                </AlertDialogContent>
            </AlertDialog>
        </>

    )
}
