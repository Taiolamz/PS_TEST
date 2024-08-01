import { Button } from "@/components/ui/button";
import { FileIcon } from "@/public/assets/icons";
import Image from "next/image";

interface EmptyStateProps {
    text?: string
    icon?: string,
    handleClick?: () => void,
    btnText?: string,
    children?: React.ReactNode
}

const EmptyState = ({icon, text, btnText, handleClick, children}: EmptyStateProps) => {
    return (
        <div className="h-[75vh] flex flex-col gap-4 items-center justify-center">
        <Image src={icon ? icon : FileIcon} alt="file icon" />
        <p className="text-custom-gray-scale-400 font-medium text-sm">
         {text}
        </p>
          {handleClick &&
          <Button className="text-custom-gray-scale-white px-3"
            onClick={handleClick}
          >
           {btnText}
          </Button> }
        {children}
      </div>
    );
}

export default EmptyState;
