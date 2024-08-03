import { ManceLoader } from "@/components/custom-loader";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import React from "react";
import style from "./LogoutModal.module.css";

interface myComponentProps {
  visible?: boolean;
  onClose?: () => void;
}

const LogoutModal = ({ visible, onClose }: myComponentProps) => {
  const loading = false;

  const handleLogoutFunc = () => {};

  return (
    <>
      <ModalContainer
        modalClass={style?.logout_modal_index_wrap}
        title="Logout Modal"
        hasCloseButton
        handleClose={onClose}
        show={visible as boolean}
      >
        <div className={style.content_wrap}>
          <p className={style?.title}>Want to Logout ?</p>
          <p className={style.text}>
            {`Are you sure you want to log out? Please confirm by clicking "Yes,
            logout" or "Cancel".`}
          </p>
        </div>
        {/* content end here */}
        <div className={style.button_wrap}>
          <Button
            variant={"outline"}
            className={`border-error text-primary font-light  hover:text-primary ${style.btn_one}`}
            onClick={() => {
              onClose && onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutFunc}
            className={` font-light ${
              loading
                ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
                : ""
            } ${style.btn_two}`}
            // disabled={loading ? true : false}
          >
            {loading ? <ManceLoader /> : "Yes, logout"}
          </Button>
        </div>
      </ModalContainer>
    </>
  );
};

export default LogoutModal;
