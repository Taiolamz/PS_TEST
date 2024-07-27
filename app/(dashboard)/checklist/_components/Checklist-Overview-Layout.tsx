import React from "react";
import ChecklistOverviewNavbar from "./Checklist-Overview-Navbar";

interface PropType {
  children: React.ReactNode;
}

const ChecklistOverviewLayout = ({ children }: PropType) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ChecklistOverviewNavbar />
      <div className=" h-screen relative  ">
        <div className="absolute bottom-0 w-screen h-[calc(100%-47px)]  overflow-auto flex flex-col items-center justify-center">
          <div className="flex flex-col items-center  justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistOverviewLayout;
