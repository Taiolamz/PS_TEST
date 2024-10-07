import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import style from "./styles/ProfileStylesIndex.module.css";

const PersonalInfoBox = () => {
  const [editState, setEditState] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      className={style.img}
      viewBox="0 0 14 14"
    >
      <path
        stroke="#6E7C87"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 11.667h5.25M9.625 2.042a1.237 1.237 0 111.75 1.75l-7.292 7.291-2.333.584.583-2.334 7.292-7.291z"
      ></path>
    </svg>
  );
  return (
    <div
      // onClick={() => {
      //   console.log(user);
      // }}
      className={style.section_box_wrapper_profile}
    >
      {/* title edit save box start */}
      <div className={style.title_btn_box}>
        <p className={style.title}>Personal Information</p>
        {editState ? (
          <>
            {" "}
            <div
              onClick={() => {
                router.push(routesPath?.ADMIN?.EMPLOYEE_VIEW)
              }}
              className={style.edit_btn}
              style={{ marginRight: "1rem" }}
            >
              <p className={style.text}>View Mode</p>
              {/* <figure>{editIcon}</figure> */}
            </div>
            <Button
              onClick={() => {
                // onSave && onSave();
              }}
              type={`button`}
              className={` ${style.upload_label} font-light `}
              //   disabled={!details?.profile_img ? true : false}
            >
              Save Changes
              {/* {loading ? <ManceLoader /> :  "Save"} */}
            </Button>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                // setEditState(true);
              }}
              className={style.edit_btn}
            >
              <p className={style.text}>Edit</p>
              <figure>{editIcon}</figure>
            </div>
          </>
        )}
      </div>
      {/* title edit save box end */}
      {/* show content start */}
      <div className={style.show_content_wrap}>
        {editState ? (
          <>
            <div className={style.edit_content_box}>
              <Input
                label="First Name"
                type="text"
                placeholder="E.g Timi"
                id="first name"
                name="first name"
                // onChange={formik.handleChange}
                // isRequired
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="E.g Ayeni"
                id="last name"
                name="last name"
                // onChange={formik.handleChange}
                // isRequired
              />

              <Input
                label="Maiden Name"
                type="text"
                placeholder="E.g Timi"
                id="maiden name"
                name="maiden name"
                // onChange={formik.handleChange}
                // isRequired
              />
              <Input
                label="Middle Name"
                type="text"
                placeholder="E.g Ayeni"
                id="middle name"
                name="middle name"
                // onChange={formik.handleChange}
                // isRequired
              />
              <CustomDateInput
                id="date_of_birth"
                label="Date of Birth"
                // selected={new Date(formik.values.date_of_birth)}
                handleChange={(date) => {
                  //   formik.setFieldValue("date_of_birth", formatDate(date));
                }}
                placeholder="YYYY/MM/DD"
                error={""}
                className="relative"
                iconClass="top-[2rem]"
                // isRequired
              />
              <CustomSelect
                label="Gender"
                // isRequired
                placeholder="Select gender"
                options={[
                  {
                    label: "Select gender",
                    value: "",
                  },
                ]}
                selected={`` as any}
                setSelected={(value) => {
                
                }}
                // labelClass={labelClassName}
              />
              <Input
                label="Work Email"
                type="email"
                placeholder="E.g aykehinde@gmail.com"
                id="work email"
                name="work email"
                // onChange={formik.handleChange}
                // isRequired
              />
              <Input
                label="Phone number"
                type="text"
                placeholder="E.g 0816263...."
                id="phone num"
                name="phone num"
                // onChange={formik.handleChange}
                // isRequired
              />
            </div>
          </>
        ) : (
          <>
            <div className={style.view_content_box}>
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>First Name</p>
                <p className={style.value}>
                  {trimLongString(user?.name?.split(" ")[0], 30)}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Last Name</p>
                <p className={style.value}>
                  {trimLongString(user?.name?.split(" ")[1], 30)}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Maiden Name</p>
                <p className={style.value}>
                  {/* {trimLongString(user?.name?.split(" ")[0], 30)} */}
                  ---
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Middle Name</p>
                <p className={style.value}>
                  {/* {trimLongString(user?.name?.split(" ")[1], 30)} */}
                  ---
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Gender</p>
                <p className={style.value}>
                  {/* {trimLongString(user?.name?.split(" ")[0], 30)} */}
                  ---
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>DOB</p>
                <p className={style.value}>
                  {/* {trimLongString(user?.name?.split(" ")[1], 30)} */}
                  ---
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Email</p>
                <p className={style.value}>
                  {/* {trimLongString(user?.name?.split(" ")[0], 30)} */}
                  ---
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Phone Number</p>
                <p className={style.value}>
                  {/* {trimLongString(user?.name?.split(" ")[1], 30)} */}
                  ---
                </p>
              </div>
              {/* label value box end */}
            </div>
          </>
        )}
      </div>
      {/* show content end */}
    </div>
  );
};

export default PersonalInfoBox;
