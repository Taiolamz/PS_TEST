import ConfirmationModal from "@/components/atoms/modals/confirm";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const CongraulatoryModal = ({
  isOrgCompleted,
}: {
  isOrgCompleted: boolean;
}) => {
  const router = useRouter();
  const { ADMIN } = routesPath;
  return (
    <div>
      <ConfirmationModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="Checklist Completed !"
        message="Congratulations ! you have successfully completed your checklist. Click on the button below to continue"
        show={isOrgCompleted}
        handleClose={() => null}
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
        handleClick={() => {
          router.push(ADMIN.OVERVIEW);
        }}
        actionBtnTitle={"Go to dashboard"}
      />
    </div>
  );
};

export default CongraulatoryModal;
