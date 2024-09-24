"use client";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { returnInitial } from "@/utils/helpers";
import Image from "next/image";
import React, { useState } from "react";
import AddressInfoBox from "./AddressInformation";
import PersonalInfoBox from "./PersonalInfoBox";
import style from "./styles/ProfileStylesIndex.module.css";
import WorkInfoBox from "./WorkInfoBox";

const ViewEmployee = () => {
  const { user } = useAppSelector((state) => state.auth);
  type detailType = {
    profile_img: any;
  };
  const [details, setDetails] = useState<detailType>({
    profile_img: "",
  });

  return (
    <>
      <DashboardLayout
        // back={pathname?.includes("/profile") ? false : true}
        back={true}
        headerTitle={`Timi Ayeni`}
      >
        <div className={style.reusable_profile_module_index_wrapper}>
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
                {/* <p className={style.title}>Your Profile Picture</p> */}
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
                              : ""
                          }
                          className={style.img}
                          width={100}
                          height={100}
                          layout="responsive"
                        />
                      </figure>
                    ) : (
                      <div className={style.avatar_box}>
                        <span>{returnInitial("Timi Ayeni" as any)}</span>
                      </div>
                    )}
                  </div>
                  <div className={style.name_email_box}>
                    <p className={style.name}>
                      {" "}
                      {trimLongString("Timi Ayeni", 45) || `Ayeni Kehinde`}
                    </p>
                    <p className={style.email}>
                      {trimLongString(user?.email, 45)}
                    </p>
                  </div>
                </div>
                {/* image content btn end */}
                {/* <p className={style.sub_text}>
                  Only standard format 800x800 px are allowed Jpg, png. File
                  must not be more than 1mb
                </p> */}
              </div>
              {/* top common section end */}
              {/* children box start */}
              <div className={style.children_box_wrap}>
                <PersonalInfoBox />
                <AddressInfoBox />
                <WorkInfoBox />
              </div>
              {/* children box end */}
            </div>
            {/* left wrapper end */}
          </div>
          {/* content wrapper end */}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ViewEmployee;
