"use client";
import React, { useContext, useEffect } from "react";
// import ActionContext from "../context/ActionContext";
import { useLazyGetAuthUserDetailsQuery } from "@/redux/services/auth/authApi";
import { useLazyGetChecklistQuery } from "@/redux/services/onboarding/checkListApi";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { useAppSelector } from "@/redux/store";
import { checkUserRole } from "@/utils/helpers";
import routesPath, {
  admin_auth
} from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import ActionContext from "../context/ActionContext";
import HeaderNavBox from "./HeaderNvaBox";
import SideMenuNavBox from "./SideMenuNavBox";
import style from "./styles/DashboardLayout.module.css";

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
  const { data: rolesData, isLoading: isLoadingroles } = useGetAllRolesQuery({});

  const [getAuthUserDetails, { isLoading }] = useLazyGetAuthUserDetailsQuery({})
  const [getChecklist] = useLazyGetChecklistQuery({})

  // This fuction update user records
  const handleGetAuthUser = async () => {
    getAuthUserDetails({})
      .unwrap()
      .then(() => {})
  }

  // This fuction update user checklist
  const handleGetChecklist = async () => {
    getChecklist({})
      .unwrap()
      .then(() => {})
  }

  
  // useEffect(() => {
  //   // handleGetAuthUser()  
  //   // handleGetChecklist()  
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

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
        className={`${style?.side_menu_index_wrap} ${actionCtx?.collapseSideNav && style?.side_menu_index_wrap_closed
          }`}
      >
        <SideMenuNavBox />
      </div>
      {/* side menu bar end */}
      {/* header nav and content bar starrt */}
      <div
        className={`${style?.main_and_header_index_wrap} ${actionCtx?.collapseSideNav && style?.main_and_header_index_wrap_closed
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
        <div className={style?.main_content_box}> {children}</div>
        {/* main content box end */}
      </div>
      {/* header nav and content bar end */}
    </div>
  );
};

export default DashboardLayout;
