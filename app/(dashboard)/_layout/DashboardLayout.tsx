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
    if (checkUserRole(user?.role as string) === "ADMIN" && "") {
      handleGetChecklist();
    }

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

    if (user && Object?.keys(user)?.length > 0) {
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
      !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "branch"
      ) &&
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

  return (
    <div
      onClick={() => {
        // console.log(rolesData);
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
                <Link
                  href={routesPath?.ADMIN.CHECKLIST}
                  className="text-primary font-semibold text-sm"
                >
                  <p className="p-4 font-semibold underline bg-[#FFFCC2]">
                    Setup Checklist...
                  </p>
                </Link>
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
