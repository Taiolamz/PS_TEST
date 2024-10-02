import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useEditProfileDetailsMutation,
  useLazyGetProfileDetailsQuery,
} from "@/redux/services/auth/authApi";
import { useAppSelector } from "@/redux/store";
import { formatDate } from "@/utils/helpers/date-formatter";
import React, { useState } from "react";
import { toast } from "sonner";
import style from "../styles/ProfileStylesIndex.module.css";

const PersonalInfoBox = () => {
  const [editState, setEditState] = useState(false);
  const [getProfileDetails] = useLazyGetProfileDetailsQuery({});
  const { user, profile } = useAppSelector((state) => state.auth);
  const [
    editProfileDetails,
    {
      isLoading: loadingProfile,
      isSuccess: editSuccess,
      //   reset: onboardingReset,
    },
  ] = useEditProfileDetailsMutation();
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

  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    maiden_name: "",
    middle_name: "",
    date_of_birth: "",
    work_email: "",
    gender: "",
    phone_number: "",
  });

  const handleChange = (e: any) => {
    e && e.preventDefault();
    const { name, value } = e.target;
    const obj = { ...details, [name]: value };
    setDetails(obj);
  };

  const handleSubmit = async () => {
    // console.log(details);
    const formDataToSend = new FormData();

    Object.entries(details).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });
    try {
      editProfileDetails(formDataToSend)
        .unwrap()
        .then((payload) => {
          handleGetProfileDetails();
          setEditState(false);
          toast.success("Personal details updated Successfully");
        });
    } catch (error) {}
  };

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  const handleEdit = () => {
    const obj = {
      first_name: profile?.personal_information?.first_name || "",
      last_name: profile?.personal_information?.last_name || "",
      maiden_name: profile?.personal_information?.maiden_name || "",
      middle_name: profile?.personal_information?.middle_name || "",
      date_of_birth: profile?.personal_information?.date_of_birth || "",
      work_email: profile?.personal_information?.work_email || "",
      gender: profile?.personal_information?.gender || "",
      phone_number: profile?.personal_information?.phone_number || "",
    };
    setDetails(obj);
    setEditState(true);
  };

  const handleGetProfileDetails = async () => {
    getProfileDetails({})
      .unwrap()
      .then(() => {});
  };

  return (
    <div
      //   onClick={() => {
      //     console.log(profile?.personal_information);
      //   }}
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
                setEditState(false);
              }}
              className={style.edit_btn}
              style={{ marginRight: "1rem" }}
            >
              <p className={style.text}>View Mode</p>
              {/* <figure>{editIcon}</figure> */}
            </div>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              type={`button`}
              className={` ${style.upload_label} font-light `}
              loading={loadingProfile}
            >
              Save Changes
              {/* {loading ? <ManceLoader /> :  "Save"} */}
            </Button>
          </>
        ) : (
          <>
            <div onClick={handleEdit} className={style.edit_btn}>
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
                name="first_name"
                onChange={handleChange}
                value={details?.first_name}
                // isRequired
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="E.g Ayeni"
                id="last name"
                name="last_name"
                onChange={handleChange}
                value={details?.last_name}
                // isRequired
              />

              <Input
                label="Maiden Name"
                type="text"
                placeholder="E.g Timi"
                id="maiden name"
                name="maiden_name"
                onChange={handleChange}
                value={details?.maiden_name}
                // isRequired
              />
              <Input
                label="Middle Name"
                type="text"
                placeholder="E.g Ayeni"
                id="middle name"
                name="middle_name"
                onChange={handleChange}
                value={details?.middle_name}
                // isRequired
              />
              <CustomDateInput
                id="date_of_birth"
                label="Date of Birth"
                selected={details?.date_of_birth as any}
                handleChange={(date) => {
                  setDetails((prev) => {
                    return { ...prev, date_of_birth: formatDate(date) };
                  });
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
                  ...genderList,
                ]}
                selected={details?.gender as any}
                setSelected={(value) => {
                  setDetails((prev) => {
                    return { ...prev, gender: value };
                  });
                }}
                // labelClass={labelClassName}
              />
              <Input
                label="Work Email"
                type="email"
                placeholder="E.g aykehinde@gmail.com"
                id="work email"
                name="work_email"
                onChange={handleChange}
                value={details?.work_email}
                // isRequired
              />
              <Input
                label="Phone number"
                type="tel"
                maxLength={14}
                placeholder="E.g 0816263...."
                id="phone num"
                name="phone_number"
                onChange={(e) => {
                  const filteredValue = e.target.value.replace(/[^0-9+]/g, "");
                  setDetails((prev) => {
                    return { ...prev, phone_number: filteredValue };
                  });
                }}
                value={details?.phone_number}
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
                  {trimLongString(
                    profile?.personal_information?.first_name || "---",
                    30
                  )}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Last Name</p>
                <p className={style.value}>
                  {trimLongString(
                    profile?.personal_information?.last_name || "---",
                    30
                  )}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Maiden Name</p>
                <p className={style.value}>
                  {trimLongString(
                    profile?.personal_information?.maiden_name || "---",
                    30
                  )}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Middle Name</p>
                <p className={style.value}>
                  {trimLongString(
                    profile?.personal_information?.middle_name || "---",
                    30
                  )}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Gender</p>
                <p className={style.value}>
                  {trimLongString(
                    profile?.personal_information?.gender || "---",
                    30
                  )}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>DOB</p>
                <p className={style.value}>
                  {profile?.personal_information?.date_of_birth || "---"}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Email</p>
                <p className={style.value}>
                  {trimLongString(
                    profile?.personal_information?.work_email || "---",
                    30
                  )}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Phone Number</p>
                <p className={style.value}>
                  {profile?.personal_information?.phone_number || "---"}
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
