import React from "react";
import ChecklistOverviewNavbar from "./Checklist-Overview-Navbar";

interface PropType {
  children: React.ReactNode;
}

const ChecklistOverviewLayout = ({ children }: PropType) => {
  return (
    <div className="relative min-h-screen ">
      <ChecklistOverviewNavbar />
      <div className=" flex justify-center mt-[58px] mx-auto h-screen">{children}</div>
    </div>
  );
};

export default ChecklistOverviewLayout;
