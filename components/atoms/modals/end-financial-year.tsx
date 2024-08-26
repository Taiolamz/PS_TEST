import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import ConfirmationModal from "./confirm";
import EndFinancialYearCompleteModal from "./end-fianancial-year-complete";

interface EndFinancialYearModalProps {
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

export default function EndFinancialYearModal({
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
}: EndFinancialYearModalProps) {
  function CloseBtn() {
    const [isVisible, setIsVisible] = useState(true);

    const handleCancel = () => {
      setIsVisible(false);
    };
  }

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEndFinancialYearClick = () => {
    setShowSuccessModal(true);
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
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
            <h3 className="mt-[14px] text-isGray900 text-2xl font-bold leading-9 mx-auto">
              {title}
            </h3>
            <p className="text-[13px] w-[300px] font-normal mx-auto mt-3 text-[#5B6871]">
              {message}
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                loading={actionBtnLoading}
                disabled={disableActionBtn}
                className="w-20 rounded-sm p-2 px-4 text-sm font-normal mr-4"
                onClick={handleClose}
                style={{ backgroundColor: "#F6F8F9", color: "#9AA6AC" }}
              >
                Close
              </Button>
              <Button
                loading={actionBtnLoading}
                disabled={disableActionBtn}
                className="w-fit rounded-sm p-3 px-9 font-normal transition-all duration-200"
                onClick={handleEndFinancialYearClick}
                style={{ backgroundColor: "#EC1410", color: "white" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.color = "";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#EC1410";
                  e.currentTarget.style.color = "white";
                }}
              >
                {actionBtnTitle ? actionBtnTitle : "Close"}
              </Button>
            </div>
            <EndFinancialYearCompleteModal
              icon="/assets/images/success.gif"
              iconClass="w-40"
              title="Current Financial Year Ended!"
              message="Congratulations ! you have successfully brought the current Financial Year to a close"
              show={showSuccessModal}
              handleClose={() => {
                handleClose();
                setShowSuccessModal(false);
              }}
              actionBtnTitle="Yes, End Financial Year"
              modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
            />
          </div>
          {content}
          {footerContent && footerContent}
        </div>
      </section>
    </ModalContainer>
  );
}
