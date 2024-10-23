import { ReusableDrawer } from "@/components/fragment";
import React, { useState } from "react";
import { styleText } from "util";
import style from "../styles/NotificationModal.module.css";
import NotifyBox from "./NotifyBox";
import { notiList } from "./noti_junks";
import { useGetAllNotificationQuery } from "@/redux/services/notification/notificationApi";
import { PageLoader } from "@/components/custom-loader";

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

  const { data: notifyData, isLoading } = useGetAllNotificationQuery({});

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
          {isLoading ? (
            <div className="flex justify-center flex-1 items-center -scale-75">
              <PageLoader />
            </div>
          ) : notifyData?.data?.length < 1 ? (
            <div className="flex flex-col justify-center flex-1 items-center text-center">
              {EmptyNotify}
              <p className="text-[var(--footer-link-color)] mb-1 mt-5">
                You don’t have any notifications
              </p>
              <p className="text-[var(--text-color2)] text-xs w-1/2">
                But as soon as something happens, you&lsquo;ll find it right
                here.
              </p>
            </div>
          ) : (
            <div className={style.notification_body}>
              {notifyData?.data?.map((chi: any, idx: number) => {
                return (
                  <NotifyBox
                    key={idx}
                    id={chi?.id}
                    text={chi?.notification_information?.body}
                    title={chi?.notification_information?.title}
                    date={chi?.notification_information?.date}
                    url={chi?.notification_information?.url}
                    read_at={chi?.read_at}
                  />
                );
              })}
            </div>
          )}
          {/* notify body end */}
        </div>
      </ReusableDrawer>
    </>
  );
};

export default NotificationModal;

const EmptyNotify = (
  <svg
    width="83"
    height="83"
    viewBox="0 0 83 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M69.3203 76.6609L6.33887 13.6742L13.674 6.33912L76.6606 69.3257L69.3203 76.6609ZM67.4372 52.7673L31.2233 16.5481C31.1922 16.2213 31.1247 15.8997 31.1247 15.5625C31.1247 9.8355 35.7727 5.1875 41.4997 5.1875C43.0378 5.18858 44.5563 5.53148 45.9455 6.1914C47.3348 6.85132 48.56 7.81175 49.5325 9.00323C50.5051 10.1947 51.2007 11.5875 51.5689 13.0807C51.9372 14.574 51.969 16.1304 51.6621 17.6375C60.9321 21.5956 67.4372 30.7878 67.4372 41.5V52.7673ZM41.4997 67.4375C39.0865 67.4365 36.7493 66.5934 34.8913 65.0536C33.0332 63.5137 31.7708 61.3737 31.3219 59.0026C34.0557 57.8095 37.5884 57.0625 41.4997 57.0625C41.8473 57.0625 42.143 57.1455 42.4854 57.1559L49.1617 63.8322C47.2579 65.985 44.5967 67.4375 41.4997 67.4375ZM41.4997 72.625C46.8117 72.625 51.6102 71.5979 55.2777 69.9534L60.0191 74.6896C54.8316 76.6246 48.4717 77.8125 41.4997 77.8125C24.3136 77.8125 10.3747 70.8457 10.3747 62.25C10.3747 59.0752 12.2993 56.1287 15.5622 53.6699V41.5C15.5622 38.1592 16.2574 35.0052 17.4038 32.0795L37.4068 52.0825C27.9085 53.0318 20.7497 57.2181 20.7497 62.25C20.7497 67.977 30.0406 72.625 41.4997 72.625Z"
      fill="#9AA6AC"
    />
  </svg>
);
