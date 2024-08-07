"use client";
import React, { useContext, useEffect, useState } from "react";
// import ActionContext from "../context/ActionContext";
import HeaderNavBox from "./HeaderNvaBox";
import SideMenuNavBox from "./SideMenuNavBox";
import style from "./styles/DashboardLayout.module.css";
import ActionContext from "../context/ActionContext";
import { useAppSelector } from "@/redux/store";
import { checkUserRole, getPrimaryColorAccent } from "@/utils/helpers";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import routesPath, {
  adminRoleList,
  admin_auth,
  checkListRoutes,
  employee_auth,
  specialRoleList,
} from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

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
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const { data: rolesData, isLoading: isLoadingroles } = useGetAllRolesQuery(
    {}
  );

  useEffect(() => {
    // document.documentElement.style.setProperty(
    //   "--primary-color",
    //   e.hex
    // );
    const color = user?.organization?.brand_colour || ("" as any);
    actionCtx?.setPrimaryColorVals(color);
    // console.log(user);

    if (Object?.keys(user)?.length > 0) {
      checkRoutePermission();
    }
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
      // onClick={() => {
      //   console.log(rolesData);
      // }}
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
          {checkListRoutes?.includes(pathname) && (
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
