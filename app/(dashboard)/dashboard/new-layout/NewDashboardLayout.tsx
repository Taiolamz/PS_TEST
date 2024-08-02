import React, { useContext, useState } from "react";
import ActionContext from "../../context/ActionContext";
import HeaderNavBox from "./HeaderNvaBox";
import SideMenuNavBox from "./SideMenuNavBox";
import style from "./styles/NewDashboardLayout.module.css";

interface myComponentProps {
  children?: React.ReactNode;
  headerListTitle?: any;
  headerTitle?: string;
  back?: boolean;
  onBack?: () => void;
}

const NewDashboardLayout = ({
  children,
  headerListTitle,
  headerTitle,
  back,
  onBack,
}: myComponentProps) => {
  const actionCtx = useContext(ActionContext);
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
            back={back || true}
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

export default NewDashboardLayout;
