"use client";

import { Button } from "@/components/ui/button";
import {
  CollapseIcon,
  LogoMini,
  LogoutIcon,
  ManceLogo,
} from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";  
import { sidebarContents } from "../../sidebar-paths";
import { useState } from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const handleCollaspe = () => {
    setOpen((prev) => !prev);
  };
  const timeDisplay = (
    <div className="mt-3 relative">
      {/* <div className="bg-primary w-[208px] h-[92px] absolute bottom-0 -z-5 border-0 rounded-[7px]"></div> */}
      <div className="bg-custom-bg p-3 border-0 w-full m-auto z-10 relative rounded-2xl flex flex-col gap-1 items-center">
        <p className="text-custom-gray-scale-400 font-normal text-xs tracking-[3%]">
          Time in 08:00am
        </p>
        <p className="text-custom-dark-blue font-medium text-xl tracking-[7%]">
          12:24pm
        </p>
        <Button className="mt-3 bg-custom-yellow text-custom-gray-scale-white px-5 transition-all duration-300 ">
          Clock out
        </Button>
      </div>
    </div>
  );

  const sidebarLayout = (
    <div className="mt-3 flex flex-col gap-5 ">
      {sidebarContents.map((chi, idx) => {
        const { label, path, icon: Icon } = chi;
        const isHightLighted = pathname === path;

        return (
          <div
            className={`group relative ${
              idx === 5 ? "border-b pb-9 mb-3 border-custom-gray" : ""
            }`}
            key={idx}
          >
            <Link
              className={`relative z-50 grid grid-cols-2  items-center transition-all duration-200 ${
                isHightLighted
                  ? "bg-white text-primary "
                  : "sidebar-item slide-anime"
              }  border-0 rounded-sm py-[4px] pr-[12px] pl-[8px] `}
              href={path}
            >
              <Icon
                className={`fill-2 ${
                  isHightLighted
                    ? "fill-primary  "
                    : "  fill-primary-light group-hover:fill-white"
                }   transition-all duration-100 group-hover:delay-500 `}
                strokeClassName={`group-hover:stroke-white  stroke-primary-light ${
                  isHightLighted ? "stroke-primary " : " "
                } transition-all duration-100  group-hover:delay-500 `}
              />
              <p
                className={`ml-[-2.5rem] font-light tracking-wide text-sm transition-all group-hover:delay-500 ${
                  isHightLighted
                    ? "text-primary "
                    : "text-primary-light group-hover:text-white "
                }`}
              >
                {label}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );

  const logout = (
    <Link
      href="/login"
      className="flex gap-2 mb-2 group items-center mt-auto cursor-pointer border-0 rounded-sm py-[4px]  pr-[12px] pl-[8px] sidebar-item slide-anime z-50 "
    >
      <Image src={LogoutIcon} alt="logout" />
      <p className="text-primary-light font-normal text-sm active:bg-white active:text-primary  group-hover:text-white transition-all group-hover:delay-500">
        Logout
      </p>
    </Link>
  );

  return (
    <div
      className={`bg-[#015858] relative transition-all ease-linear ${
        open ? "w-[80px]" : "w-[260px]"
      } h-screen py-0 flex flex-col overflow-auto customScrollbar`}
    >
      {!open ? (
        <>
          <div className="space-y-4 pt-3 sticky top-0 bg-[#015858] z-[80] px-4">
            <div
              onClick={handleCollaspe}
              className="flex gap-3 items-center mt-3 cursor-pointer"
            >
              <Image src={CollapseIcon} alt="collapse" />
              <p className="text-sm text-white ">Collapse</p>
            </div>
            <Image
              src={ManceLogo}
              alt="mance logo"
              className="border-b pb-2 border-custom-gray  pr-10 w-full "
            />
          </div>
          <div className="flex overflow-y-auto ml-4 ">{sidebarLayout}</div>
          <div className="space-y-4 sticky pb-3 bottom-0 bg-[#015858] z-[80] mx-4">
            {timeDisplay}
            {logout}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4 pt-3 sticky top-0 bg-[#015858] z-[80] px-4">
            <div
              onClick={handleCollaspe}
              className="flex  items-center mt-3 cursor-pointer"
            >
              <Image src={CollapseIcon} alt="collapse" className="mx-auto" />
            </div>
            <Image
              src={LogoMini}
              alt="mini mance logo"
              className="pb-2 w-full "
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSidebar;
