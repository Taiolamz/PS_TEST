import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/store";
import { getOrdinalSuffix, processInputAsArray } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import style from "./styles/ProfileStylesIndex.module.css";
import { Dictionary } from "@/@types/dictionary";
import { cn } from "@/lib/utils";

const WorkInfoBox = ({ data }: { data: Dictionary }) => {
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

  const listManagers = [
    { name: "Timi Ayeni", line_manager: true },
    { name: "Timi Ayeni", line_manager: true },
    { name: "Timi Ayeni", line_manager: true },
    // { name: "Timi Ayeni", line_manager: true },
    // { name: "Timi Ayeni", line_manager: false },
  ];

  return (
    <div
      //   onClick={() => {
      //     console.log(user);
      //   }}
      className={style.section_box_wrapper_profile}
    >
      {/* title edit save box start */}
      <div className={style.title_btn_box}>
        <p className={style.title}>Work Information</p>
        {editState ? (
          <>
            {" "}

          </>
        ) : (
          <>
            {/* {user?.role === "super-admin" && <div
              onClick={() => {
                router.push(routesPath?.ADMIN?.EMPLOYEE_EDIT)
              }}
              className={style.edit_btn}
            >
              <p className={style.text}>Edit</p>
              <figure>{editIcon}</figure>
            </div>} */}
          </>
        )}
      </div>
      {/* title edit save box end */}
      {/* show content start */}
      <div className={style.show_content_wrap}>
        {editState ? (
          <>
            <div className={style.edit_content_box}>
              <CustomDateInput
                id="date_of_birth_"
                label="Resumption Date"
                // selected={new Date(formik.values.date_of_birth)}
                handleChange={(date) => {
                  //   formik.setFieldValue("date_of_birth", formatDate(date));
                }}
                placeholder="Resumption Date"
                error={""}
                className="relative"
                iconClass="top-[2rem]"
              // isRequired
              // disabled
              />
              <Input
                label="Work Email"
                type="text"
                placeholder="Email"
                id="work email"
                name="work email"
              // onChange={formik.handleChange}
              // isRequired
              // disabled
              />
              <Input
                label="Line Manger Name"
                type="text"
                placeholder="Line Manger Name"
                id="Line Manger Name"
                name="line manager"
              // onChange={formik.handleChange}
              // isRequired
              // disabled
              />
              <Input
                label="Line Manger Email"
                type="text"
                placeholder="Line Manger Email"
                id="Line Manger Email"
                name="line manager email"
              // onChange={formik.handleChange}
              // isRequired
              // disabled
              />
              <CustomSelect
                label="Grade Level"
                // isRequired
                placeholder="Select grade level"
                options={[
                  {
                    label: "Select grade level",
                    value: "",
                  },
                ]}
                selected={`` as any}
                setSelected={(value) => { }}
              // labelClass={labelClassName}
              // disabled
              />
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "subsidiary"
              ) && (
                  <CustomSelect
                    label="Subsidiary"
                    // isRequired
                    placeholder="Select subsidiary"
                    options={[
                      {
                        label: "Select subsidiary",
                        value: "",
                      },
                    ]}
                    selected={`` as any}
                    setSelected={(value) => { }}
                  // labelClass={labelClassName}
                  //   disabled
                  />
                )}
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "branch"
              ) && (
                  <CustomSelect
                    label="Branch"
                    // isRequired
                    placeholder="Select branch"
                    options={[
                      {
                        label: "Select branch",
                        value: "",
                      },
                    ]}
                    selected={`` as any}
                    setSelected={(value) => { }}
                  // labelClass={labelClassName}
                  //   disabled
                  />
                )}
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "department"
              ) && (
                  <CustomSelect
                    label="Department"
                    // isRequired
                    placeholder="Select department"
                    options={[
                      {
                        label: "Select department",
                        value: "",
                      },
                    ]}
                    selected={`` as any}
                    setSelected={(value) => { }}
                  // labelClass={labelClassName}
                  //   disabled
                  />
                )}
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "unit"
              ) && (
                  <CustomSelect
                    label="Unit"
                    // isRequired
                    placeholder="Select unit"
                    options={[
                      {
                        label: "Select unit",
                        value: "",
                      },
                    ]}
                    selected={`` as any}
                    setSelected={(value) => { }}
                  // labelClass={labelClassName}
                  //   disabled
                  />
                )}
              <Input
                label="Staff Number"
                type="text"
                placeholder="staff number"
                id="staff number"
                name="staff number"
              // onChange={formik.handleChange}
              // isRequired
              // disabled
              />
              <Input
                label="Current Job Title"
                type="text"
                placeholder="Current Job Title"
                id="Current Job Title"
                name="Current Job Title"
              // onChange={formik.handleChange}
              // isRequired
              // disabled
              />
              <Input
                label="Current Role"
                type="text"
                placeholder="Current Role"
                id="Current Role"
                name="Current Role"
              // onChange={formik.handleChange}
              // isRequired
              // disabled
              />
              <Input
                label="Former Job Title"
                type="text"
                placeholder="Former Job Title"
                id="Former Job Title"
                name="Former Job Title"
              // onChange={formik.handleChange}
              // isRequired
              // disabled
              />
              <div
                className=""
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1.5rem",
                }}
              >
                {" "}
                <CustomDateInput
                  id="start_date"
                  label="Start Date"
                  // selected={new Date(formik.values.date_of_birth)}
                  handleChange={(date) => {
                    //   formik.setFieldValue("date_of_birth", formatDate(date));
                  }}
                  placeholder="YYYY/MM/DD"
                  error={""}
                  className="relative"
                  iconClass="top-[2rem]"
                // isRequired
                //   disabled
                />
                <CustomDateInput
                  id="start_date"
                  label="End Date"
                  // selected={new Date(formik.values.date_of_birth)}
                  handleChange={(date) => {
                    //   formik.setFieldValue("date_of_birth", formatDate(date));
                  }}
                  placeholder="YYYY/MM/DD"
                  error={""}
                  className="relative"
                  iconClass="top-[2rem]"
                // isRequired
                // disabled
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${style.view_content_box} ${style.view_content_box_two}`}
            >
              <CustomDateInput
                id="resumption_date"
                label="Resumption Date"
                showIcon={false}
                // selected={new Date(formik.values.date_of_birth)}
                handleChange={(date) => {
                  //   formik.setFieldValue("date_of_birth", formatDate(date));
                }}
                placeholder={data?.resumption_date || ""}
                error={""}
                className="relative"
                iconClass="top-[2rem]"
                // isRequired
                disabled
              />
              <Input
                label="Work Email"
                type="text"
                placeholder="Email"
                id="work email"
                name="work email"
                value={data?.email || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              <Input
                label="Line Manger Name"
                type="text"
                placeholder="Line Manger Name"
                id="Line Manger Name"
                name="line manager"
                value={data?.line_manager_name || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              <Input
                label="Line Manger Email"
                type="text"
                placeholder="Line Manger Email"
                id="Line Manger Email"
                name="line manager email"
                value={data?.line_manager_email || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              <Input
                label="Grade"
                type="text"
                placeholder="Staff Level"
                id="level"
                name="level"
                value={data?.level || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "subsidiary"
              ) && (
                  <Input
                    label="Subsidiary"
                    type="text"
                    placeholder="Staff Subsidiary"
                    id="subsidiary"
                    name="subsidiary"
                    value={data?.subsidiary?.name || "---"}
                    // onChange={formik.handleChange}
                    // isRequired
                    disabled
                  />
                )}
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "branch"
              ) && (
                  <Input
                    label="Branch"
                    type="text"
                    placeholder="Staff Branch"
                    id="branch"
                    name="branch"
                    value={data?.branch?.name || "---"}
                    // onChange={formik.handleChange}
                    // isRequired
                    disabled
                  />
                )}
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "department"
              ) && (
                  <Input
                    label="Department"
                    type="text"
                    placeholder="Staff Department"
                    id="department"
                    name="department"
                    value={data?.department?.name || "---"}
                    // onChange={formik.handleChange}
                    // isRequired
                    disabled
                  />
                )}
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "unit"
              ) && (
                  <Input
                    label="Unit"
                    type="text"
                    placeholder="Staff Unit"
                    id="unit"
                    name="unit"
                    value={data?.unit?.name || "---"}
                    // onChange={formik.handleChange}
                    // isRequired
                    disabled
                  />
                )}
              <Input
                label="Staff Number"
                type="text"
                placeholder="staff number"
                id="staff number"
                name="staff number"
                value={data?.staff_number || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              <Input
                label="Current Job Title"
                type="text"
                placeholder="Current Job Title"
                id="Current Job Title"
                name="Current Job Title"
                value={data?.staff_number || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              <Input
                label="Current Role"
                type="text"
                placeholder="Current Role"
                id="Current Role"
                name="Current Role"
                value={data?.role || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              <Input
                label="Former Job Title"
                type="text"
                placeholder="Former Job Title"
                id="Former Job Title"
                name="Former Job Title"
                value={data?.previous_designation || "---"}
                // onChange={formik.handleChange}
                // isRequired
                disabled
              />
              <div
                className=""
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1.5rem",
                }}
              >
                {" "}
                <Input
                  label="Start Date"
                  type="text"
                  placeholder="Start Date"
                  id="start_date"
                  name="start_date"
                  value={data?.previous_designation_start_date || "---"}
                // onChange={formik.handleChange}
                // isRequired
                // disabled
                />
                <Input
                  label="End Date"
                  type="text"
                  placeholder="End Date"
                  id="end_date"
                  name="end_date"
                  value={data?.previous_designation_end_date || "---"}
                // onChange={formik.handleChange}
                // isRequired
                // disabled
                />
              </div>
            </div>
          </>
        )}
        {/* approval flow box start */}
        <div className={cn(
          style.approval_flow_box_wrap,
          "hidden"
        )}>
          <p className={style.title}>Approval Flow</p>
          {/* list box start */}
          <div className={`${style.list_pos_box} ${listManagers?.length < 4 ? style.list_pos_box_small : ""}`}>
            {listManagers?.map((chi, idx) => {
              return (
                <div key={idx} className={style.item_row}>
                  <p className={style.position}>
                    <span>{getOrdinalSuffix(idx + 1)}</span>
                  </p>
                  <div className={style.name_role_box}>
                    <p className={style.name}>{trimLongString(chi?.name, 20)}</p>
                    <p className={style.role}>line manager</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* list box end */}
        </div>
        {/* approval flow box end */}
      </div>
      {/* show content end */}
    </div>
  );
};

export default WorkInfoBox;
