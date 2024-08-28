import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface EndFinancialYearCompleteModalProps {
  show: boolean;
  hasCloseButton?: boolean;
  handleClose: () => void;
  icon?: string;
  iconClass?: string;
  modalClass?: string;
  title: string;
  actionBtnLoading?: boolean;
  disableActionBtn?: boolean;
  message: string | React.ReactNode;
  actionBtnTitle?: string | React.ReactNode;
  handleClick?: () => void;
  content?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function EndFinancialYearCompleteModal({
  show,
  hasCloseButton = false,
  handleClose,
  icon,
  iconClass,
  actionBtnLoading,
  disableActionBtn,
  title,
  message,
  actionBtnTitle,
  handleClick,
  content,
  footerContent,
  modalClass,
}: EndFinancialYearCompleteModalProps) {

      const [isModalOpen, setIsModalOpen] = useState(false);

       const openModal = () => {
         setIsModalOpen(true);
       };

         const closeModal = () => {
           setIsModalOpen(false);
         };


  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass={cn(
        "rounded-none py-10 px-6 bg-white md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[37.5rem] lg:max-w-[37.5rem]",
        modalClass
      )}
      hasCloseButton={hasCloseButton}
    >
      <section>
        <div className="">
          <div className="text-center mb-5">
            {icon && (
              <div className="flex justify-center">
                <Image
                  src={icon}
                  width={71}
                  height={40}
                  className={`${cn(iconClass)}`}
                  alt={"icon"}
                />
              </div>
            )}
            <h3 className="mt-[14px] text-isGray900 text-2xl font-bold leading-9 mx-auto">
              {title}
            </h3>
            <p className="text-[13px] w-[300px] font-normal mx-auto mt-3 text-[#5B6871]">
              {message}
            </p>

            <div className="mt-4">
              <Button
                loading={actionBtnLoading}
                disabled={disableActionBtn}
                className="w-fit rounded-sm p-3 px-9 mx-auto font-normal"
                onClick={handleClose}
              >
                Complete
              </Button>
            </div>
          </div>

          {content}

          {footerContent && footerContent}
        </div>
      </section>
    </ModalContainer>
  );
}
