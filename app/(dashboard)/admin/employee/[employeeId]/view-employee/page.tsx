"use client";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { returnInitial } from "@/utils/helpers";
import Image from "next/image";
import React, { useState } from "react";
import AddressInfoBox from "./AddressInformation";
import PersonalInfoBox from "./PersonalInfoBox";
import style from "./styles/ProfileStylesIndex.module.css";
import WorkInfoBox from "./WorkInfoBox";
import { useDeleteStaffMutation, useGetStaffInfoQuery } from "@/redux/services/employee/employeeApi";
import { PageLoader } from "@/components/custom-loader";
import { cn } from "@/lib/utils";
import { Trash } from "iconsax-react";
import ModalContainer from "@/components/modal-container";
import DeleteModal from "@/components/atoms/modals/delete";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import routesPath from "@/utils/routes";
import { setEmployeeData } from "@/redux/features/employee/employeeSlice";

const ViewEmployee = ({
  params,
}: {
  params: { employeeId: string };
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  const navigate = useRouter()
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth);
  type detailType = {
    profile_img: any;
  };
  const [details, setDetails] = useState<detailType>({
    profile_img: "",
  });

  const STAFF_ID = params?.employeeId ?? "";

  const [deleteStaff, { isLoading: isDeletingStaff }] = useDeleteStaffMutation()

  const { data: staffInfo, isLoading, isFetching } = useGetStaffInfoQuery({ staff_id: STAFF_ID })
  const STAFF_INFO = staffInfo?.data ?? {}

  const handleDeleteStaff = async (staff_id: string) => {
    deleteStaff({ staffId: STAFF_ID })
      .unwrap()
      .then(() => {
        setShowDeleteModal(false)
        toast.success("Account Deleted Successfully")
        navigate.back()
      })
  }


  return (
    <>
      <DashboardLayout
        // back={pathname?.includes("/profile") ? false : true}
        back={true}
        headerTitle={"Profile Details"}
      >
        {
          isLoading || isFetching ? (
            <div className="h-screen grid place-content-center">
              <PageLoader />
            </div>
          ) :
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
                    className={cn(
                      style.top_section,
                      "!w-full !flex !flex-row !justify-between !items-center"
                    )}
                  >
                    <div>
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
                              <span>{returnInitial(STAFF_INFO?.name as any)}</span>
                            </div>
                          )}
                        </div>
                        <div className={style.name_email_box}>
                          <p className={style.name}>
                            {" "}
                            {trimLongString(STAFF_INFO?.name, 45) || `---`}
                          </p>
                          <p className={style.email}>
                            {trimLongString(STAFF_INFO?.email, 45)}
                          </p>
                        </div>
                      </div>
                      {/* image content btn end */}
                      {/* <p className={style.sub_text}>
                            Only standard format 800x800 px are allowed Jpg, png. File
                            must not be more than 1mb
                          </p> 
                      */}
                    </div>
                    <>
                      {user?.role === "super-admin" && <div
                        className=""
                      >
                        <div className="flex items-center gap-3">
                          <p className="text-sm border p-1.5 w-fit px-4 rounded-md cursor-pointer"
                            onClick={() => {
                              dispatch(setEmployeeData(STAFF_INFO))
                              navigate.push(routesPath?.ADMIN?.UPDATE_EMPLOYEE({
                                employeeId: STAFF_ID
                              }))
                            }}
                          >Edit</p>
                          <Trash color="red" className="cursor-pointer" onClick={() => setShowDeleteModal(true)} />
                        </div>
                      </div>}
                    </>
                  </div>
                  {/* top common section end */}
                  {/* children box start */}
                  <div className={style.children_box_wrap}>
                    <PersonalInfoBox data={STAFF_INFO} />
                    <AddressInfoBox data={STAFF_INFO} />
                    <WorkInfoBox data={STAFF_INFO} />
                  </div>
                  {/* children box end */}
                </div>
                {/* left wrapper end */}
              </div>
              {/* content wrapper end */}
            </div>
        }
      </DashboardLayout>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        title="Delete Employee"
        content={
          <p className="my-4 text-[13px] text-gray-500 leading-5">You&apos;re about to delete this information. Deleting this would erase all information about this Employee
            <p>Do you still want to delete?</p>
          </p>
        }
        loading={isDeletingStaff}
        handleClick={handleDeleteStaff}
      />
    </>
  );
};

export default ViewEmployee;
