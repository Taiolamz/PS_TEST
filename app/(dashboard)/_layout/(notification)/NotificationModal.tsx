import { ReusableDrawer } from "@/components/fragment";
import React, { useState } from "react";
import { styleText } from "util";
import style from "../styles/NotificationModal.module.css";
import NotifyBox from "./NotifyBox";
import { notiList } from "./noti_junks";

interface myComponentProps {
  visible?: boolean;
  onClose?: () => void;
}

const NotificationModal = ({ visible, onClose }: myComponentProps) => {
  const handleClose = () => {
    onClose && onClose();
  };

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={style.img}
    >
      <rect width="24" height="24" fill="#F4F4F4" rx="12"></rect>
      <path
        fill="var(--primary-color)"
        fillRule="evenodd"
        d="M12.943 12l2.862-2.862a.666.666 0 10-.943-.943L12 11.057 9.138 8.195a.666.666 0 10-.943.943L11.057 12l-2.862 2.862a.666.666 0 10.943.943L12 12.943l2.862 2.862a.665.665 0 00.943 0 .666.666 0 000-.943L12.943 12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

 

  return (
    <>
      <ReusableDrawer
        // title="Comment"
        show={visible}
        handleClose={handleClose}
        closeOnClickOutside={true}
      >
        <div className={style.notification_general_wrapper_index_box}>
          {/* notitifcation header start */}
          <div className={style.notification_header}>
            <p className={style.title}>Notifications</p>
            <div onClick={handleClose} className={style.close_icon}>
              <figure className={style.img_box}>{closeIcon}</figure>
            </div>
          </div>
          {/* notitifcation header end */}
          {/* notify body start */}
          <div className={style.notification_body}>
            {notiList?.map((chi, idx) => {
              return (
                <NotifyBox
                  key={idx}
                  id={`${chi?.id}-${idx}`}
                  text={chi?.text}
                  title={chi?.title}
                  date={chi?.date}
                />
              );
            })}
          </div>
          {/* notify body end */}
        </div>
      </ReusableDrawer>
    </>
  );
};

export default NotificationModal;
