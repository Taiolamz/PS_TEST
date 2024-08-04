import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/services/auth/authApi";
import { useRouter } from "next/navigation";
import style from "./LogoutModal.module.css";

interface myComponentProps {
  visible?: boolean;
  onClose?: () => void;
}

const LogoutModal = ({ visible, onClose }: myComponentProps) => {

  const [logout, {isLoading}] = useLogoutMutation()

  const handleLogoutFunc = async () => {
    logout({})
    .unwrap()
    .then(() => {})
  };

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
            loading={isLoading}
            loadingText="Yes, Logout"
            disabled={isLoading}
            className={cn(
              "font-light",
              style.btn_two
            )}
          >
            Yes, Logout
          </Button>
        </div>
      </ModalContainer>
    </>
  );
};

export default LogoutModal;
