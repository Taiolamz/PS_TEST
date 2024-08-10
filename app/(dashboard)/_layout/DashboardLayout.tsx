"use client";
import React, { useContext, useEffect } from "react";
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
// import { checklistDetails } from "../admin/checklist/checklist-steps";

interface myComponentProps {
  children?: React.ReactNode;
  headerListTitle?: any;
  headerTitle?: string;
  back?: boolean;
  onBack?: () => void;
}

const DashboardLayout = ({
  children,
  headerListTitle,
  headerTitle,
  back,
  onBack,
}: myComponentProps) => {
  const actionCtx = useContext(ActionContext);
  const { user, checklist } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const { ADMIN } = routesPath;
  const { data: rolesData, isLoading: isLoadingroles } = useGetAllRolesQuery(
    {}
  );

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

  useEffect(() => {
    // document.documentElement.style.setProperty(
    //   "--primary-color",
    //   e.hex
    // );
    const color = user?.organization?.brand_colour || ("" as any);
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
      isAllChecked: checklist?.employee_count < 2 ? false : true,
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
          link: routesPath?.ADMIN?.CREATE_MISSION_PLAN_TEMPLATE,
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
    if (checklist?.employee_count < 2) {
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
              <>
                <div
                  // href={routesPath?.ADMIN.CHECKLIST}
                  className="text-primary font-semibold text-sm"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    className="bg-[#FFFCC2] underline py-2 px-8"
                  >
                    {" "}
                    <p
                      onClick={() => {
                        router.push(routesPath?.ADMIN.CHECKLIST);
                      }}
                      className=" font-semibold  "
                      style={{ cursor: "pointer" }}
                    >
                      Setup Checklist...
                    </p>
                    <Button
                      onClick={handleProceedChecklist}
                      className={`font-light`}
                    >
                      Proceed
                    </Button>
                  </div>
                </div>
              </>
            )}
          {children}
        </div>
        {/* main content box end */}
      </div>
      {/* header nav and content bar end */}
    </div>
  );
};

export default DashboardLayout;
