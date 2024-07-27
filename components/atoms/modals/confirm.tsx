import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ConfirmationModalProps {
  show: boolean;
  hasCloseButton?: boolean;
  handleClose: () => void;
  icon?: string;
  iconClass?: string;
  title: string;
  actionBtnLoading?: boolean;
  disableActionBtn?: boolean;
  message: string | React.ReactNode;
  actionBtnTitle?: string | React.ReactNode;
  handleClick?: () => void;
  content?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function ConfirmationModal({
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
  footerContent
}: ConfirmationModalProps) {
  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass="rounded-none py-10 px-6 bg-white md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[37.5rem] lg:max-w-[37.5rem]"
      hasCloseButton={hasCloseButton}
    >
      <section>
        <div className="">
          <div className="text-center mb-5">
            {
              icon &&
              <div className="flex justify-center">
                <Image
                  src={icon}
                  width={71}
                  height={40}
                  className={`${cn(
                    iconClass
                  )}`}
                  alt={'icon'}
                />
              </div>
            }
            <h3 className="mt-[14px] text-isGray900 text-2xl font-bold leading-9 mx-auto">{title}</h3>
            <p className="text-[13px] w-[300px] font-normal mx-auto mt-3 text-[#5B6871]">{message}</p>
          </div>
          {content}
          {handleClick && (
            <div className="mt-8 flex justify-center">
              <Button
                loading={actionBtnLoading}
                disabled={disableActionBtn}
                className="w-fit rounded-sm p-3 px-9 mx-auto font-normal"
                onClick={handleClick}
              >
                {actionBtnTitle ? actionBtnTitle : "Confirm"}
              </Button>
            </div>
          )}
          {footerContent && footerContent}
        </div>
      </section>
    </ModalContainer>
  );
}
