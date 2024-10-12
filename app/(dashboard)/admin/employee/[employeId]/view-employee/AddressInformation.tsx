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
import { Dictionary } from "@/@types/dictionary";

const AddressInfoBox = ({ data }: { data: Dictionary }) => {
  const [editState, setEditState] = useState(false);
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
      //   onClick={() => {
      //     console.log(user);
      //   }}
      className={style.section_box_wrapper_profile}
    >
      {/* title edit save box start */}
      <div className={style.title_btn_box}>
        <p className={style.title}>Address Information</p>
        {editState ? (
          <>
            {" "}

          </>
        ) : (
          <>
            {/* <div
              onClick={() => {
                // setEditState(true);
                router.push(routesPath?.ADMIN.EMPLOYEE_EDIT)
              }}
              className={style.edit_btn}
            >
              <p className={style.text}>Edit</p>
              <figure>{editIcon}</figure>
            </div> */}
          </>
        )}
      </div>
      {/* title edit save box end */}
      {/* show content start */}
      <div className={style.show_content_wrap}>
        {editState ? (
          <>
            <div className={style.edit_content_box}>
              <CustomSelect
                label="Country"
                // isRequired
                placeholder="Select country"
                options={[
                  {
                    label: "Select country",
                    value: "",
                  },
                ]}
                selected={`` as any}
                setSelected={(value) => {
                  //   formik.setFieldValue("country", value);
                  //   const countryData = COUNTRIES_STATES?.filter(
                  //     (f: Dictionary) => f.name === value
                  //   )?.[0];
                  //   formik.setFieldValue("state", "");
                  //   setSelectedCountryData(countryData);
                }}
              // labelClass={labelClassName}
              />{" "}
              <CustomSelect
                label="State"
                // isRequired
                placeholder="Select state"
                options={[
                  {
                    label: "Select state",
                    value: "",
                  },
                ]}
                selected={`` as any}
                setSelected={(value) => {
                  //   formik.setFieldValue("country", value);
                  //   const countryData = COUNTRIES_STATES?.filter(
                  //     (f: Dictionary) => f.name === value
                  //   )?.[0];
                  //   formik.setFieldValue("state", "");
                  //   setSelectedCountryData(countryData);
                }}
              // labelClass={labelClassName}
              />
              <Input
                label="City"
                type="text"
                placeholder="E.g Lekki"
                id="cituy name"
                name="cituy name"
              // onChange={formik.handleChange}
              // isRequired
              />
              <Input
                label="Street Address"
                type="text"
                placeholder="E.g ikoyi"
                id="street add"
                name="street add"
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
                <p className={style.label}>Country</p>
                <p className={style.value}>{data?.country || "---"}</p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>State</p>
                <p className={style.value}>{data?.state || "---"}</p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>City</p>
                <p className={style.value}>
                  {data?.city || "---"}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Street</p>
                <p className={style.value}>
                  {data?.street || "---"}
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

export default AddressInfoBox;
