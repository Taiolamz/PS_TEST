"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import style from "./styles/HeaderNavBox.module.css";
import Image from "next/image";
import unknownImg from "./assests/Unknown_person.png";
import { useOnClickOutside } from "./UseOutsideClick";
import routesPath from "@/utils/routes";
import { useAppSelector } from "@/redux/store";
import { trimLongString } from "./Helper";
import { returnInitial } from "@/utils/helpers";

interface myComponentProps {
  headerListTitle?: any;
  headerTitle?: string;
  back?: boolean;
  onBack?: () => void;
}

const backIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 25"
    className={style.img}
  >
    <path
      fill="#6E7C87"
      d="M11.53 15.22a.75.75 0 01-1.06 1.06l-3.25-3.25a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 1.06L8.81 12.5l2.72 2.72zm-.06-2.19l4.25 4.25a.75.75 0 001.06-1.06l-3.72-3.72 3.72-3.72a.75.75 0 00-1.06-1.06l-4.25 4.25a.75.75 0 000 1.06z"
    ></path>
  </svg>
);

const HeaderNavBox = ({
  headerListTitle,
  headerTitle,
  back,
  onBack,
}: myComponentProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [dropProfile, setDropProfile] = useState<boolean>(false);
  const pathname = usePathname();

  const searchIcon = (
    <svg
      className={style.img}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z"
        fill="#9AA6AC"
      />
    </svg>
  );

  const notifyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={style.img_box}
    >
      <path
        stroke="var(--primary-color)"
        d="M11.996 4.75a6.188 6.188 0 00-6.188 6.188v3.76a2 2 0 01-.576 1.404l-.484.491a1.917 1.917 0 00-.553 1.347v0c0 1.059.859 1.917 1.918 1.917h11.766a1.918 1.918 0 001.917-1.917v0c0-.504-.198-.988-.552-1.347l-.484-.49a2 2 0 01-.577-1.405v-3.76M15.163 19.857v.226a3.167 3.167 0 01-6.333 0v-.226"
      ></path>
      <rect
        width="9.003"
        height="9.003"
        x="13"
        y="1"
        fill="#EC1410"
        rx="4.502"
      ></rect>
      <path
        fill="#fff"
        d="M15.949 6.835V4.917l.125.432-.537.23-.098-.655.702-.321h.514v2.232h-.706zM15.473 7v-.621h1.668V7h-1.668zm3.033.034c-.236 0-.436-.048-.6-.142a.914.914 0 01-.376-.412 1.55 1.55 0 01-.128-.662c0-.259.043-.478.128-.658a.911.911 0 01.375-.415c.165-.095.365-.142.601-.142s.437.047.601.142a.906.906 0 01.378.415c.086.18.129.4.129.658 0 .26-.043.48-.129.662a.909.909 0 01-.378.412 1.187 1.187 0 01-.6.142zm0-.601a.35.35 0 00.307-.159c.072-.106.108-.258.108-.456 0-.209-.036-.369-.108-.48a.344.344 0 00-.307-.168.344.344 0 00-.307.169c-.072.11-.108.27-.108.48 0 .197.036.35.108.455a.35.35 0 00.307.159z"
      ></path>
    </svg>
  );

  const dropIcon = (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 14.7222C9.97505 14.7222 9.4501 14.4972 9.05264 14.0555L4.16311 8.6222C3.94563 8.38053 3.94563 7.98053 4.16311 7.73887C4.38059 7.4972 4.74055 7.4972 4.95803 7.73887L9.84756 13.1722C10.2075 13.5722 10.7925 13.5722 11.1524 13.1722L16.042 7.73887C16.2594 7.4972 16.6194 7.4972 16.8369 7.73887C17.0544 7.98053 17.0544 8.38053 16.8369 8.6222L11.9474 14.0555C11.5499 14.4972 11.0249 14.7222 10.5 14.7222Z"
        fill="#5A5B5F"
      />
    </svg>
  );

  const profileRef = useOnClickOutside(() => {
    setDropProfile(false);
  });

  const editIcon = (
    <svg
      className={style.img}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="#5A5B5F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.667 17.5v-1.667a3.333 3.333 0 00-3.333-3.333H6.667a3.333 3.333 0 00-3.333 3.333V17.5M10 9.167A3.333 3.333 0 1010 2.5a3.333 3.333 0 000 6.667z"
      ></path>
    </svg>
  );

  const logouticon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={style.img}
    >
      <path
        stroke="#EC1410"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.5 17.5H4.167A1.667 1.667 0 012.5 15.833V4.167A1.667 1.667 0 014.167 2.5H7.5M13.334 14.167L17.501 10l-4.167-4.167M17.5 10h-10"
      ></path>
    </svg>
  );

  const profileList = [
    { name: "Edit Profile", icon: editIcon, onClick: () => {} },
    { name: "Logout", icon: logouticon, onClick: () => {}, red: true },
  ];

  const [switchRole, setSwitchRole] = useState("");

  useEffect(() => {
    if (pathname?.includes("/admin")) {
      setSwitchRole("admin");
    } else {
      setSwitchRole("employee");
    }
  }, []);

  const switchDashboard = () => {
    if (switchRole === "admin") {
      router.push(routesPath?.EMPLOYEE?.OVERVIEW);
    } else {
      router.push(routesPath?.ADMIN?.OVERVIEW);
    }
  };

  return (
    <div
      onClick={() => {
        // console.log(user);
      }}
      className={style.header_wrap_index_box}
    >
      {/* back comp start */}
      {back && (
        <>
          <div
            onClick={() => {
              if (window?.history?.length > 1) {
                router.back();
              }
            }}
            className={style.back_box}
          >
            <figure className={style.img_box}>{backIcon}</figure>
            <p className={style.text}>Back</p>
          </div>
        </>
      )}
      {/* back comp end */}
      {/* title start  */}
      <div className={style.title_box}>
        {headerListTitle?.length > 0 ? (
          <>
            {headerListTitle?.map((chi: any, idx: any) => {
              return (
                <p key={idx} className={style.title}>
                  {chi}
                </p>
              );
            })}
          </>
        ) : (
          <>
            <p className={style.title}>
              {headerTitle || "Welcome ITH Holdings"}
            </p>
          </>
        )}
      </div>
      {/* title  end */}
      {/* search box start */}
      <div className={style?.search_box}>
        <input type="text" className={style?.search_input} />
        <figure className={style.img_box}>{searchIcon}</figure>
      </div>
      {/* search box end */}
      {/* notification box start */}
      <div className={style.notification_box}>
        <figure className={style.img_box}>{notifyIcon}</figure>
      </div>
      {/* notification box end */}
      {/* profile box start */}
      <div ref={profileRef} className={style.profile_wrap_box}>
        <div
          onClick={() => {
            setDropProfile(!dropProfile);
          }}
          className={style.img_drop_box}
        >
          {/* <figure className={`${style.profile_img_box}`}>
            <Image alt="profile-img" src={unknownImg} className={style.img} />
          </figure> */}
          <div className={style.avatar_box}>
            <span>{returnInitial(user?.name as any)}</span>
          </div>
          <figure className={style.img_box}>{dropIcon}</figure>
        </div>
        {/* profil drop start */}
        {dropProfile && (
          <div className={style.drop_profile_box}>
            {/* image name box start */}
            <div className={style.img_name_box}>
              {/* <figure className={`${style.profile_img_box}`}>
                <Image
                  alt="profile-img"
                  src={unknownImg}
                  className={style.img}
                />
              </figure> */}
              <div className={style.avatar_box}>
                <span>{returnInitial(user?.name as any)}</span>
              </div>
              <div className={style.name_role_box}>
                <p className={style.name}>
                  {trimLongString(user?.name, 20) || `Ayeni Kehinde`}
                </p>
                <p className={style.role}>{user?.designation || ""}</p>
              </div>
            </div>
            {/* image name box end */}
            {/* middle options start */}
            <div className={style.middle_options_box}>
              {profileList?.map((chi, idx) => {
                return (
                  <div
                    onClick={() => {
                      chi?.onClick && chi?.onClick();
                    }}
                    key={idx}
                    className={style.item_row}
                  >
                    <figure className={style.img_box}>{chi.icon}</figure>
                    <p
                      style={{ color: chi?.red ? "rgba(236, 20, 16, 1)" : "" }}
                      className={style.name}
                    >
                      {chi?.name}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* middle options end */}
            {/* switch start */}
            <div onClick={switchDashboard} className={style.switch_box}>
              <p className={style.switch}>
                {switchRole === "employee"
                  ? `SWITCH TO ADMIN DASHOARD`
                  : `SWITCH TO EMPLOYEE DASHOARD`}
              </p>
            </div>
            {/* switch end */}
          </div>
        )}
        {/* profil drop end */}
      </div>
      {/* profile box end */}
    </div>
  );
};

export default HeaderNavBox;
