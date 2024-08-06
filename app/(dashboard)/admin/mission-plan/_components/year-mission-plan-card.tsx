import React from "react";
import Image from "next/image";
import { StatsIcon } from "@/public/assets/icons";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BadgeComponent from "@/components/badge/BadgeComponents";

type CardPropType = { 
  title?: string, 
  created_by?: string, 
  date?: string, 
  status: string, 
  href?: string, 
  handleClick?: () => void 
};
export default function YearMissionPlanCard({ title, created_by, date, status,href, handleClick }: CardPropType) {
  return (
    <div
      className="capitalize bg-white h-[140px] w-full border rounded-[5px] border-custom-gray group hover:border-primary transition-all duration-300 p-4 bg-transparent cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <Image className="" src={StatsIcon} alt="plus"/>
        {/* <BadgeComponent text="pending" color="green" className="text-[10px] focus:ring-2 focus:ring-ring focus:ring-offset-2"/> */}
        <Badge
          className="text-[10px]"
          variant={
            status?.toLowerCase() === "pending"
              ? "pendingborder"
              : status?.toLowerCase() === "completed"
              ? "successborder"
              : "successborder"
          }
        >
          {status}
        </Badge>
      </div>
      <div className="">
        <div className=" mt-5 font-normal text-base ">{title}</div>
        <div className="text-custom-ash mt-1 font-normal text-[10px]">
         {created_by}
        </div>
        <div className="text-custom-gray-scale-300 mt-1 font-normal text-[10px]">
          {date}
        </div>
      </div>
    </div>
  );
}
