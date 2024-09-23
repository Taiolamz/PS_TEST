"use client";

import { useAppSelector } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import DashboardLayout from "../(dashboard)/_layout/DashboardLayout";
import style from "./profile/styles/ProfileStylesIndex.module.css";
import ReuseProfileTabs from "./ReuseProfileTabs";
// import { Doughnut } from "react-chartjs-2";
import MyDoughnutChart from "./profile/ProgressChart";
import CountUp from "react-countup";
import { trimLongString } from "../(dashboard)/_layout/Helper";
import { checkUserRole, returnInitial } from "@/utils/helpers";
import Image from "next/image";
import unknownImg from "./profile/assests/Unknown_person.png";
import { Button } from "@/components/ui/button";
import { ManceLoader } from "@/components/custom-loader";
import routesPath from "@/utils/routes";

interface myComponentProps {
  pageTitle?: string;
  children?: React.ReactNode;
}

const ProfileReusableLayout = ({ pageTitle, children }: myComponentProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  type detailType = {
    profile_img: any;
  };
  const [details, setDetails] = useState<detailType>({
    profile_img: "",
  });
  const listToComplete = [
    { name: "Setup Account", complete: true },
    { name: "Personal Information", complete: true },
    { name: "Upload Photo", complete: false },
    { name: "Contact Information", complete: false },
    { name: "Work Information", complete: false },
  ];

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={style.img}
    >
      <path
        stroke="#162238"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 6L9 17l-5-5"
      ></path>
    </svg>
  );

  const cancelIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={style.img}
    >
      <path
        stroke="#6E7C87"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 6L6 18M6 6l12 12"
      ></path>
    </svg>
  );

  return (
    <>
      <DashboardLayout
        // back={pathname?.includes("/profile") ? false : true}
        back={false}
        onBack={() => {
          if (document.referrer?.includes("/profile")) {
            checkUserRole(user?.role as string) === "ADMIN"
              ? router.push(routesPath?.ADMIN?.OVERVIEW)
              : router.push(routesPath?.EMPLOYEE?.OVERVIEW);
          } else {
            router?.back();
          }
        }}
        headerTitle={`Profile`}
      >
        <div className={style.reusable_profile_module_index_wrapper}>
          <ReuseProfileTabs />
          {/* content wrapper start */}
          <div className={style.content_two_card_wrapper}>
            {/* left wrapper start */}
            <div className={style.left_wrapper_box}>
              {/* top common section start */}
              <div
                // onClick={() => {
                //   console.log(user);
                // }}
                className={style.top_section}
              >
                <p className={style.title}>Your Profile Picture</p>
                <div className={style.img_content_btn_box}>
                  <input
                    accept="image/*"
                    type="file"
                    name="profile-user-image"
                    id="profile-user-image"
                    className={style.upload_input}
                    onChange={(e: any) => {
                      const file = e?.target?.files[0];
                      if (file !== undefined) {
                        setDetails((prev) => {
                          return { ...prev, profile_img: file };
                        });
                      }
                    }}
                  />
                  <div className={style.img_wrap}>
                    {details?.profile_img ? (
                      <figure className={`${style.profile_img_box}`}>
                        <Image
                          alt="profile-img"
                          src={
                            details?.profile_img
                              ? URL.createObjectURL(details?.profile_img)
                              : unknownImg
                          }
                          className={style.img}
                          width={100}
                          height={100}
                          layout="responsive"
                        />
                      </figure>
                    ) : (
                      <div className={style.avatar_box}>
                        <span>{returnInitial(user?.name as any)}</span>
                      </div>
                    )}
                  </div>
                  <div className={style.name_email_box}>
                    <p className={style.name}>
                      {" "}
                      {trimLongString(user?.name, 45) || `Ayeni Kehinde`}
                    </p>
                    <p className={style.email}>
                      {trimLongString(user?.email, 45)}
                    </p>
                  </div>

                  {!details?.profile_img ? (
                    <label
                      className={style.upload_label}
                      htmlFor="profile-user-image"
                    >
                      <span>Upload Picture</span>
                    </label>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          // onSave && onSave();
                        }}
                        type={`button`}
                        className={` ${style.upload_label} font-light `}
                        disabled={!details?.profile_img ? true : false}
                      >
                        Save Picture
                        {/* {loading ? <ManceLoader /> :  "Save"} */}
                      </Button>
                    </>
                  )}
                </div>
                {/* image content btn end */}
                <p className={style.sub_text}>
                  Only standard format 800x800 px are allowed Jpg, png. File
                  must not be more than 1mb
                </p>
              </div>
              {/* top common section end */}
              {/* children box start */}
              <div className={style.children_box_wrap}>{children}</div>
              {/* children box end */}
            </div>
            {/* left wrapper end */}
            {/* right wrapper start */}
            <div className={style.right_wrapper_box}>
              <div className={style.complete_progress_profile_box}>
                <p className={style?.title}>Complete your Profile</p>
                <div className={style.progress_box}>
                  <div className={style.percent}>
                    <CountUp end={40} />%
                  </div>
                  <MyDoughnutChart totalVal={40} />
                </div>
                {/* progress end here */}
                {/* list start */}
                <div className={style.list_box}>
                  {listToComplete?.map((chi, idx) => {
                    const { complete, name } = chi;
                    return (
                      <div className={style.item_row} key={idx}>
                        <div className={style.icon}>
                          <figure className={style.img_box}>
                            {complete ? checkIcon : cancelIcon}
                          </figure>
                        </div>
                        <p
                          className={`${style.name} ${
                            !complete ? style.name_fade : ``
                          }`}
                        >
                          {name}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* list end */}
              </div>
            </div>
            {/* right wrapper end */}
          </div>
          {/* content wrapper end */}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProfileReusableLayout;
