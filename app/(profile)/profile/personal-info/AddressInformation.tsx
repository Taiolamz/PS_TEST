import { Dictionary } from "@/@types/dictionary";
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
import { COUNTRIES_STATES } from "@/utils/data";
import React, { useState } from "react";
import { toast } from "sonner";
import style from "../styles/ProfileStylesIndex.module.css";

const AddressInfoBox = () => {
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

  const [details, setDetails] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e: any) => {
    e && e.preventDefault();
    const { name, value } = e.target;
    const obj = { ...details, [name]: value };
    setDetails(obj);
  };

  const handleEdit = () => {
    const obj = {
      address: profile?.contact_information?.address || "",
      city: profile?.contact_information?.city || "",
      state: profile?.contact_information?.state || "",
      country: profile?.contact_information?.country || "",
    };
    // console.log(obj);
    if (profile?.contact_information?.country) {
      const countryData = COUNTRIES_STATES?.filter(
        (f: Dictionary) => f.name === profile?.contact_information?.country
      )?.[0];
      setSelectedCountryData(countryData);
    }
    setDetails(obj);
    setEditState(true);
  };

  const handleGetProfileDetails = async () => {
    getProfileDetails({})
      .unwrap()
      .then(() => {});
  };

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

  const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
    {}
  );

  const handleSubmit = async () => {
    // console.log(details);
    const formDataToSend = new FormData();

    Object.entries(details).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });
    formDataToSend.append(
      "first_name",
      profile?.personal_information?.first_name
    );
    formDataToSend.append(
      "last_name",
      profile?.personal_information?.last_name
    );
    try {
      editProfileDetails(formDataToSend)
        .unwrap()
        .then((payload) => {
          handleGetProfileDetails();
          setEditState(false);
          toast.success("Contact details updated Successfully");
        });
    } catch (error) {}
  };

  return (
    <div
      //   onClick={() => {
      //     console.log(profile);
      //   }}
      className={style.section_box_wrapper_profile}
    >
      {/* title edit save box start */}
      <div className={style.title_btn_box}>
        <p className={style.title}>Address Information</p>
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
              onClick={handleSubmit}
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
            <div
              onClick={() => {
                handleEdit();
                setEditState(true);
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
              <CustomSelect
                label="Country"
                // isRequired
                placeholder="Select country"
                options={[
                  {
                    label: "Select country",
                    value: "",
                  },
                  ...COUNTRIES_STATES?.map((item) => {
                    return {
                      label: item.name,
                      value: item.name,
                    };
                  }),
                ]}
                selected={details?.country as any}
                setSelected={(value) => {
                  setDetails((prev) => {
                    return { ...prev, country: value, state: "" };
                  });
                  const countryData = COUNTRIES_STATES?.filter(
                    (f: Dictionary) => f.name === value
                  )?.[0];
                  setSelectedCountryData(countryData);
                }}
                // labelClass={labelClassName}
              />{" "}
              <CustomSelect
                label="State"
                // isRequired
                placeholder="Select state"
                options={selectedCountryData?.stateProvinces?.map(
                  (item: Dictionary) => {
                    return {
                      label: item.name,
                      value: item.name,
                    };
                  }
                )}
                disabled={!details?.country}
                selected={details?.state as any}
                setSelected={(value) => {
                  setDetails((prev) => {
                    return { ...prev, state: value };
                  });
                }}
                // labelClass={labelClassName}
              />
              <Input
                label="City"
                type="text"
                placeholder="E.g Lekki"
                id="cituy name"
                name="city"
                onChange={handleChange}
                value={details?.city}
                // isRequired
              />
              <Input
                label="Street Address"
                type="text"
                placeholder="E.g ikoyi"
                id="street add"
                name="address"
                onChange={handleChange}
                value={details?.address}
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
                <p className={style.value}>
                  {profile?.contact_information?.country || "---"}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>State</p>
                <p className={style.value}>
                  {profile?.contact_information?.state || "---"}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>City</p>
                <p className={style.value}>
                  {profile?.contact_information?.city || "---"}
                </p>
              </div>
              {/* label value box end */}
              {/* label value box start */}
              <div className={style.label_value_box}>
                <p className={style.label}>Street</p>
                <p className={style.value}>
                  {profile?.contact_information?.address || "---"}
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
