import React from "react";
import Image from "next/image";
import { StatsIcon } from "@/public/assets/icons";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type CardPropType = { state: string; href?: string, handleClick?: () => void };
export default function YearMissionPlanCard({ state, href, handleClick }: CardPropType) {
  return (
    <div
      className="capitalize h-[140px] w-full border rounded-[5px] border-custom-gray group hover:border-primary transition-all duration-300 p-4 bg-transparent cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <Image className="" src={StatsIcon} alt="plus" />
        <Badge
          className="text-[10px]"
          variant={
            state?.toLowerCase() === "in-progress"
              ? "pendingborder"
              : state?.toLowerCase() === "completed"
              ? "successborder"
              : "danger"
          }
        >
          {state}
        </Badge>
      </div>
      <div className="">
        <div className=" mt-5 font-normal text-base ">Mission Plan 2023</div>
        <div className="text-custom-ash mt-1 font-normal text-[10px]">
          Created by Admin
        </div>
        <div className="text-custom-gray-scale-300 mt-1 font-normal text-[10px]">
          20/04/2024
        </div>
      </div>
    </div>
  );
}
