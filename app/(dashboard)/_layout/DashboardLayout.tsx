"use client";
import React, { useContext, useEffect, useState } from "react";
// import ActionContext from "../context/ActionContext";
import { useLazyGetAuthUserDetailsQuery } from "@/redux/services/auth/authApi";
import { useLazyGetChecklistQuery } from "@/redux/services/onboarding/checkListApi";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { useAppSelector } from "@/redux/store";
import {
  checkUserRole,
  formatChecklistPercent,
  processInputAsArray,
} from "@/utils/helpers";
import style from "./styles/DashboardLayout.module.css";
import routesPath, {
  adminRoleList,
  admin_auth,
  checkListRoutes,
  employee_auth,
  specialRoleList,
} from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ActionContext from "../context/ActionContext";
import SideMenuNavBox from "./SideMenuNavBox";
import HeaderNavBox from "./HeaderNvaBox";
import { Button } from "@/components/ui/button";
import NotificationModal from "./(notification)/NotificationModal";
import { WarningIcon } from "@/public/assets/icons";
import Image from "next/image";

// import { checklistDetails } from "../admin/checklist/checklist-steps";

interface myComponentProps {
  children?: React.ReactNode;
  headerListTitle?: any;
  headerTitle?: string;
  back?: boolean;
  onBack?: () => void;
  childClass?: string;
}

const DashboardLayout = ({
  children,
  headerListTitle,
  headerTitle,
  back,
  onBack,
}: myComponentProps) => {
  const actionCtx = useContext(ActionContext);
  const [showNotification, setShowNotification] = useState(false);
  const { user, checklist } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const { ADMIN } = routesPath;
  // const { data: rolesData, isLoading: isLoadingroles } = useGetAllRolesQuery(
  //   {}
  // );

  const [getAuthUserDetails, { isLoading }] = useLazyGetAuthUserDetailsQuery(
    {}
  );
  const [getChecklist] = useLazyGetChecklistQuery({});

  // This fuction update user records
  const handleGetAuthUser = async () => {
    getAuthUserDetails({})
      .unwrap()
      .then(() => {});
  };

  // This fuction update user checklist
  const handleGetChecklist = async () => {
    getChecklist({})
      .unwrap()
      .then(() => {});
  };

  useEffect(() => {
    // if (checkUserRole(user?.role as string) === "ADMIN") {
    //   handleGetChecklist();
    // }
    handleGetChecklist();
    //  console.log(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const ArrowRight = (
    <svg
      width="24"
      height="24"
      className="group-hover:translate-x-1 transition-all ease-linear"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 11.75C4.5 11.4278 4.73949 11.1614 5.05021 11.1193L5.13659 11.1134H17.8684C18.22 11.1134 18.505 11.3985 18.505 11.75C18.505 12.0723 18.2655 12.3387 17.9548 12.3808L17.8684 12.3866H5.13659C4.78501 12.3866 4.5 12.1016 4.5 11.75Z"
        fill="currentColor"
      />
      <path
        d="M12.2851 7.0877C12.0359 6.83963 12.0351 6.43656 12.2831 6.18742C12.5087 5.96093 12.8623 5.93963 13.1119 6.124L13.1834 6.18548L18.3186 11.2986C18.5458 11.5248 18.5664 11.8797 18.3806 12.1293L18.3186 12.2008L13.1835 17.3147C12.9343 17.5628 12.5313 17.562 12.2832 17.3129C12.0576 17.0864 12.0378 16.7327 12.2233 16.4839L12.285 16.4126L16.967 11.7494L12.2851 7.0877Z"
        fill="currentColor"
      />
    </svg>
  );

  useEffect(() => {
    // document.documentElement.style.setProperty(
    //   "--primary-color",
    //   e.hex
    // );
    const color = user?.organization?.brand_colour || ("" as any);
    // console.log(color);

    actionCtx?.setPrimaryColorVals(color);
    // console.log(user);
    if (getNextLink(getListToUse(checklistDetails[0]?.items))?.length > 0) {
      // console.log(getNextLink(getListToUse(checklistDetails[0]?.items)));
      // console.log(getListToUse(checklistDetails[0]?.items));

      actionCtx?.setCheckListLength(
        getListToUse(checklistDetails[0]?.items)?.length,
        getListToUse(checklistDetails[0]?.items)
      );
    }

    if (user && Object?.keys(user)?.length < 1) {
      checkRoutePermission();
      handleGetAuthUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const checkRoutePermission = () => {
    const role = user?.role;
    if (
      checkUserRole(role as string) === "EMPLOYEE" &&
      pathname?.includes(admin_auth)
    ) {
      router?.push(routesPath?.EMPLOYEE?.OVERVIEW);
      return;
    }
    // no subsidiary check
    if (
      !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "subsidiary"
      ) &&
      pathname?.includes("subsidiary")
    ) {
      router?.back();
    }
    // no branches check
    if (
      !processInputAsArray(user?.organization?.hierarchy)?.includes("branch") &&
      pathname?.includes("branches")
    ) {
      router?.back();
    }
    // no departments check
    if (
      !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "department"
      ) &&
      pathname?.includes("departments")
    ) {
      router?.back();
    }
    // no units check
    if (
      !processInputAsArray(user?.organization?.hierarchy)?.includes("unit") &&
      pathname?.includes("units")
    ) {
      router?.back();
    }

    // if (checkUserRole(role as string) === "SUPER ADMIN") {
    //   // console.log("yes");
    //   // ------- special role people
    // } else {
    //   // admin guard here ----
    //   if (
    //     checkUserRole(role as string) === "ADMIN" &&
    //     pathname?.includes(employee_auth)
    //   ) {
    //     router?.push(routesPath?.ADMIN?.OVERVIEW);
    //     return;
    //   }
    //   //  employee gaurd here ----
    //   if (
    //     checkUserRole(role as string) === "EMPLOYEE" &&
    //     pathname?.includes(admin_auth)
    //   ) {
    //     router?.push(routesPath?.EMPLOYEE?.OVERVIEW);
    //     return;
    //   }
    // }
  };

  const checklistDetails = [
    {
      title: "Set up organization structure",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      items: [
        {
          isChecked: checklist?.subsidiary_count < 1 ? false : true,
          label: "Add Subsidiary",
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "subsidiary"
          )
            ? true
            : false,
          link: ADMIN?.CREATE_SUBSIDIARY,
        },
        {
          isChecked: checklist?.branch_count < 1 ? false : true,
          label: "Add Branches",
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "branch"
          )
            ? true
            : false,
          link: ADMIN?.CREATE_BRANCH,
        },
        {
          isChecked: checklist?.department_count < 1 ? false : true,
          label: "Add Department",
          link: ADMIN?.CREATE_DEPARTMENT,
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "department"
          )
            ? true
            : false,
        },
        {
          isChecked: checklist?.unit_count < 1 ? false : true,
          label: "Add Unit",
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "unit"
          )
            ? true
            : false,
          link: ADMIN?.CREATE_UNIT,
        },
      ],
      // isAllChecked: isCardOneChecked,
      // path: ADMIN.SUBSIDIARY,
      // link: ADMIN?.CREATE_S,
    },
    {
      title: "Set up employee and roles",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      // isChecked: checklist?.employee_count < 1 ? false : true,
      path: ADMIN.ADD_EMPLOYEE,
      hide: false,
      isAllChecked: checklist?.employee_exist,
    },
    {
      title: "Set up mission plan",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      items: [
        {
          isChecked: checklist?.mission_flow_exist,
          label: "Create Mission Plan Template",
          hide: false,
          link: routesPath?.ADMIN?.MISSION_PLAN_TEMPLATE_LEVEL,
        },
        {
          isChecked: checklist?.approval_flow_exist,
          label: "Approval Flow",
          hide: false,
          link: routesPath?.ADMIN?.CREATE_MISSION_PLAN_APPROVAL_FLOW,
        },
      ],
      isAllChecked:
        checklist?.mission_flow_exist && checklist?.approval_flow_exist
          ? true
          : false,
    },
  ];

  // const newListAfterHide =

  const handleProceedChecklist = () => {
    // console.log(getNextLink(getListToUse(checklistDetails[0]?.items)));
    if (getNextLink(getListToUse(checklistDetails[0]?.items))?.length > 0) {
      if (Number(checklistDetails[0]?.items?.length) > 0) {
        router?.push(
          getNextLink(getListToUse(checklistDetails[0]?.items))[0]?.link
        );
        return;
      }
    }
    if (!checklist?.employee_exist) {
      router.push(ADMIN.ADD_EMPLOYEE);
      return;
    }
    if (Number(checklistDetails[2]?.items?.length) > 0) {
      router?.push(
        getNextLink(getListToUse(checklistDetails[2]?.items))[0]?.link
      );
      return;
    }
  };

  const getListToUse = (list: any) => {
    if (list?.length > 0) {
      const newList = list?.filter((chi: any) => !chi?.hide);
      // console.log(newList);
      return newList;
    }
  };

  const getNextLink = (list: any) => {
    if (list?.length > 0) {
      const newList = list?.filter((chi: any) => !chi?.isChecked);
      // console.log(newList);
      return newList;
    }
  };

  return (
    <div
      onClick={() => {
        // console.log(rolesData);
        // console.log(getNextLink(getListToUse(checklistDetails[0]?.items)));
      }}
      className={style?.new_dashboard_layout_index_wrap}
    >
      {/* side menu bar starrt */}
      <div
        className={`${style?.side_menu_index_wrap} ${
          actionCtx?.collapseSideNav && style?.side_menu_index_wrap_closed
        }`}
      >
        <SideMenuNavBox />
      </div>
      {/* side menu bar end */}
      {/* header nav and content bar starrt */}
      <div
        className={`${style?.main_and_header_index_wrap} ${
          actionCtx?.collapseSideNav && style?.main_and_header_index_wrap_closed
        }`}
      >
        {/* header nav box start */}
        <div className={style?.header_nav_box}>
          <HeaderNavBox
            onNotify={() => {
              setShowNotification(true);
            }}
            headerListTitle={headerListTitle}
            headerTitle={headerTitle}
            back={back}
            onBack={onBack}
          />
        </div>
        {/* header nav box end */}
        {/* main content box start */}
        <div className={style?.main_content_box}>
          {checkListRoutes?.includes(pathname) &&
            formatChecklistPercent(checklist?.completion_percent) !== 100 && (
              // <>
              //   <div
              //     // href={routesPath?.ADMIN.CHECKLIST}
              //     className="text-primary font-semibold text-sm"
              //   >
              //     <div
              //       style={{
              //         display: "flex",
              //         alignItems: "center",
              //         justifyContent: "space-between",
              //         width: "100%",
              //       }}
              //       className="bg-[#FFFCC2] underline py-2 px-8"
              //     >
              //       {" "}
              //       <p
              //         onClick={() => {
              //           router.push(routesPath?.ADMIN.CHECKLIST);
              //         }}
              //         className=" font-semibold  "
              //         style={{ cursor: "pointer" }}
              //       >
              //         Setup Checklist...
              //       </p>
              //       <Button
              //         onClick={handleProceedChecklist}
              //         className={`font-light`}
              //       >
              //         Proceed
              //       </Button>
              //     </div>
              //   </div>
              // </>
              <>
                {/* updated feature... */}
                <div
                  style={{ backgroundColor: "rgba(255, 252, 194, 0.3)" }}
                  className="absolute z-20 w-full right-0  bg-[#FFFCC2] py-2 px-8 flex justify-between items-center"
                >
                  <div className="flex gap-14 items-center">
                    <div className="flex gap-2 items-center">
                      <Image src={WarningIcon} alt="warning icon" />
                      <p className="text-[#252C32] font-medium text-base">
                        Complete your checklist
                      </p>
                    </div>
                    <p
                      className="text-xs text-[#252C32] underline font-light cursor-pointer"
                      onClick={handleProceedChecklist}
                    >
                      finish checklist items to fully access organization
                      features
                    </p>
                  </div>
                  <div
                    onClick={handleProceedChecklist}
                    className="font-medium cursor-pointer text-sm text-[var(--primary-color)] inline-flex gap-x-1 items-center group"
                  >
                    Proceed
                    {ArrowRight}
                  </div>
                </div>
              </>
            )}
          {/* <div className="h-screen"> */}
          {/* {" "} */}
          {/* update */}
          {children}
          {/* </div> */}
        </div>
        {/* main content box end */}
      </div>
      {/* header nav and content bar end */}
      {/* Notification Modal start */}
      <NotificationModal
        onClose={() => {
          setShowNotification(false);
        }}
        visible={showNotification}
      />
      {/* Notification Modal End */}
    </div>
  );
};

export default DashboardLayout;
