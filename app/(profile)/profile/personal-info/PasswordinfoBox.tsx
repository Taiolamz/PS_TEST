import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import TogglePassword from "@/components/toggle-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/store";
import React, { useState } from "react";
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
                  name="password cur"
                  //   value={values.password}
                  //   onChange={handleChange}
                  //   touched={touched.password}
                  //   error={errors.password}
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
                  name="password new"
                  //   value={values.password}
                  //   onChange={handleChange}
                  //   touched={touched.password}
                  //   error={errors.password}
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
                  name="password cur new"
                  //   value={values.password}
                  //   onChange={handleChange}
                  //   touched={touched.password}
                  //   error={errors.password}
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
        ) : (
          <>
            <div className={`${style.view_content_box} ${style.view_content_box_two}`}>
            <div className="relative">
                <Input
                  label="Current Password"
                  id="password cur"
                  name="password cur"
                  disabled
                  //   value={values.password}
                  //   onChange={handleChange}
                  //   touched={touched.password}
                  //   error={errors.password}
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
                  disabled
                  label="New Password"
                  id="password new"
                  name="password new"
                  //   value={values.password}
                  //   onChange={handleChange}
                  //   touched={touched.password}
                  //   error={errors.password}
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
                  disabled
                  label="Confirm New Password"
                  id="password cur new"
                  name="password cur new"
                  //   value={values.password}
                  //   onChange={handleChange}
                  //   touched={touched.password}
                  //   error={errors.password}
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
