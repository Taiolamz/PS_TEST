import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import PasswordChecker from "@/components/password-checker";
import TogglePassword from "@/components/toggle-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePasswordMutation } from "@/redux/services/auth/authApi";
import { useAppSelector } from "@/redux/store";
import {
  validatePasswordLength,
  validatePasswordLowercase,
  validatePasswordNumber,
  validatePasswordSpecialCharacter,
  validatePasswordUpperCase,
} from "@/utils/helpers";
import { passwordValidations, passwordValidation as pv } from "@/utils/schema";
import React, { useState } from "react";
import { toast } from "sonner";
import style from "../styles/ProfileStylesIndex.module.css";

const PasswordInfoBox = () => {
  const [editState, setEditState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

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

  const [
    changePassword,
    {
      isLoading: loadingProfile,
      isSuccess: editSuccess,
      //   reset: onboardingReset,
    },
  ] = useChangePasswordMutation();

  const [details, setDetails] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const handleChange = (e: any) => {
    e && e.preventDefault();
    if (passwordError) {
      setPasswordError("");
    }
    const { name, value } = e.target;
    const obj = { ...details, [name]: value };
    setDetails(obj);
  };

  const getValueFunc = (param?: any) => {
    if (editState) {
      return param || "";
    } else {
      return "************";
    }
  };

  const handleSubmit = async () => {
    if (details?.password !== details?.password_confirmation) {
      setPasswordError("Password does not match");
      return;
    }

    const obj = { ...details };
    try {
      changePassword(obj)
        .unwrap()
        .then((payload) => {
          setEditState(false);
          toast.success("Password updated Successfully");
          setTimeout(() => {
            setDetails({
              current_password: "",
              password: "",
              password_confirmation: "",
            });
          }, 300);
        });
    } catch (error) {}
  };

  const checkValidatePassword = () => {
    let val;
    if (!validatePasswordLowercase(details?.password)) {
      val = true;
      return val;
    }
    if (!validatePasswordUpperCase(details?.password)) {
      val = true;
      return val;
    }
    if (!validatePasswordSpecialCharacter(details?.password)) {
      val = true;
      return val;
    }
    if (!validatePasswordNumber(details?.password)) {
      val = true;
      return val;
    }
    if (!validatePasswordLength(details?.password)) {
      val = true;
      return val;
    } else {
      val = false;
      return val;
    }
  };

  return (
    <div
      //   onClick={() => {
      //     console.log(user);
      //   }}
      className={style.section_box_wrapper_profile}
    >
      {/* title edit save box start */}
      <div className={style.title_btn_box}>
        <p className={style.title}>Change Password</p>
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
              disabled={
                !details?.current_password ||
                !details?.password ||
                !details?.password_confirmation ||
                checkValidatePassword()
              }
              loadingText={"Updating"}
            >
              Save Changes
              {/* {loading ? <ManceLoader /> :  "Save"} */}
            </Button>
          </>
        ) : (
          <>
            <div
              onClick={() => {
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
              <div className="relative">
                <Input
                  label="Current Password"
                  id="password cur"
                  name="current_password"
                  disabled={!editState}
                  value={details?.current_password}
                  onChange={handleChange}
                  placeholder="Input Password"
                  type={showPassword ? "text" : "password"}
                />
                <TogglePassword
                  showPassword={showPassword}
                  setShowPassword={() => setShowPassword(!showPassword)}
                  className="top-9"
                />
              </div>
              <div className="relative">
                <Input
                  label="New Password"
                  id="password new"
                  name="password"
                  disabled={!editState}
                  value={details?.password}
                  onChange={handleChange}
                  placeholder="Input Password"
                  type={showPassword ? "text" : "password"}
                  error={passwordError}
                  touched={passwordError ? true : false}
                />
                <TogglePassword
                  showPassword={showPassword}
                  setShowPassword={() => setShowPassword(!showPassword)}
                  className="top-9"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0%",
                    width: "100%",
                  }}
                  className="mt-6 flex flex-col gap-2"
                >
                  {passwordValidations?.map((validation, idx) => (
                    <PasswordChecker
                      key={idx}
                      isValid={pv(details?.password, validation)}
                      title={validation}
                    />
                  ))}
                </div>
              </div>
              <div className="relative">
                <Input
                  label="Confirm New Password"
                  id="password cur new"
                  name="password_confirmation"
                  disabled={!editState}
                  value={details?.password_confirmation}
                  onChange={handleChange}
                  placeholder="Input Password"
                  type={showPassword ? "text" : "password"}
                  error={passwordError}
                  touched={passwordError ? true : false}
                />
                <TogglePassword
                  showPassword={showPassword}
                  setShowPassword={() => setShowPassword(!showPassword)}
                  className="top-9"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${style.view_content_box} ${style.view_content_box_two}`}
            >
              <div className="relative">
                <Input
                  label="Current Password"
                  id="password cur"
                  name="current_password"
                  disabled={!editState}
                  value={details?.current_password}
                  onChange={handleChange}
                  placeholder="Input Password"
                  type={showPassword ? "text" : "password"}
                />
                <TogglePassword
                  showPassword={showPassword}
                  setShowPassword={() => setShowPassword(!showPassword)}
                  className="top-9"
                />
              </div>
              <div className="relative">
                <Input
                  label="New Password"
                  id="password new"
                  name="password"
                  disabled={!editState}
                  value={details?.password}
                  onChange={handleChange}
                  placeholder="Input Password"
                  type={showPassword ? "text" : "password"}
                />
                <TogglePassword
                  showPassword={showPassword}
                  setShowPassword={() => setShowPassword(!showPassword)}
                  className="top-9"
                />
              </div>
              <div className="relative">
                <Input
                  label="Confirm New Password"
                  id="password cur new"
                  name="password_confirmation"
                  disabled={!editState}
                  value={details?.password_confirmation}
                  onChange={handleChange}
                  placeholder="Input Password"
                  type={showPassword ? "text" : "password"}
                />
                <TogglePassword
                  showPassword={showPassword}
                  setShowPassword={() => setShowPassword(!showPassword)}
                  className="top-9"
                />
              </div>
            </div>
          </>
        )}
      </div>
      {/* show content end */}
    </div>
  );
};

export default PasswordInfoBox;
