"use client";
import React, { useContext, useEffect, useState } from "react";
// import ActionContext from "../context/ActionContext";
import HeaderNavBox from "./HeaderNvaBox";
import SideMenuNavBox from "./SideMenuNavBox";
import style from "./styles/DashboardLayout.module.css";
import ActionContext from "../context/ActionContext";
import { useAppSelector } from "@/redux/store";
import { getPrimaryColorAccent } from "@/utils/helpers";

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

  useEffect(() => {
    // document.documentElement.style.setProperty(
    //   "--primary-color",
    //   e.hex
    // );
    const color = user?.organization?.brand_colour || "" as any;
    actionCtx?.setPrimaryColorVals(color);
    // console.log(user);
  }, [user]);

  return (
    <div className={style?.new_dashboard_layout_index_wrap}>
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
        <div className={style?.main_content_box}> {children}</div>
        {/* main content box end */}
      </div>
      {/* header nav and content bar end */}
    </div>
  );
};

export default DashboardLayout;
