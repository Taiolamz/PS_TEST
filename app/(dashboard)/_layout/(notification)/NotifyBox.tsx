import React, { useState } from "react";
import style from "../styles/NotificationModal.module.css";

interface myComponentProps {
  children?: React.ReactNode;
  title?: string;
  text?: string;
  date?: string;
  onView?: () => void;
  id?: any;
}

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    className={style.img}
  >
    <path
      fill="var(--primary-color)"
      d="M6.56 11.387a.665.665 0 01-.471-.195l-2.56-2.56a.667.667 0 11.943-.943L6.56 9.778l4.969-4.969a.667.667 0 01.943.943l-5.44 5.44a.664.664 0 01-.472.195z"
    ></path>
  </svg>
);

const NotifyBox = ({ children, onView, text, title, id, date }: myComponentProps) => {
  const [showView, setShowView] = useState("");
  return (
    <div
      className={style.noti_wrap_box}
      onMouseEnter={() => {
        // if (showView !== id) {
        //   setShowView(id);
        // }
        setShowView(id);
      }}
      onMouseLeave={() => {
        showView && setShowView("");
      }}
    >
      <div className={style.icon_title_text_dot_box}>
        <div className={style.icon_round}>
          <figure className={style.img_box}>{checkIcon}</figure>
        </div>
        <div className={style.title_text_box}>
          <p className={style.title}>{title || "Mission Plan!"}</p>
          <p className={style.text}>
            {text ||
              "Create strategic pillars for staff in the organization to run their mission plan for the financial year."}
          </p>
          <div className={style.date}>
           <span>{date}</span>
          </div>
        </div>
        {/* dot here */}
        <div className={style.dot_box}></div>
        {/* dot here end */}
      </div>
      {/* text content dot end */}
      <div
        className={`${style.view_box_wrap}  ${
          showView === id && style.view_box_wrap_show
        }`}
      >
        <div className={style.view_box}>
            <p className={style.text}>View</p>
        </div>
      </div>
    </div>
  );
};

export default NotifyBox;
