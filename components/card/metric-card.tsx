import React, { ReactNode } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/* ----- LIST OF AVAILABLE ICONS SVG DOWNLOADED FOR THIS COMPOPNENT
import {
  SubsidiaryIcon,
  BranchesIcon,
  DepartmentIcon,
  UnitIcon,
  StaffIcon,
  InviteStaffIcon,
  TeamIcon,
} from "@/public/assets/icons";
------- */

type CardPropType = {
  option?:
    | "darkgreen"
    | "purple"
    | "blue"
    | "lightgreen"
    | "yellow"
    | "default";
  count: string | number;
  onClick?: () => void;
  icon?: string;
  svg?: ReactNode;
  title?: string;
  isActive?: boolean;
};
export default function MetricCard({
  option,
  count,
  title,
  icon,
  svg,
  isActive,
  ...props
}: CardPropType) {
  let optionObject;

  switch (option) {
    case "darkgreen":
      optionObject = {
        borderCss: "hover:ring-2 hover:ring-[rgb(var(--bg-green-200))]",
        active: "border-2 border-[rgb(var(--bg-green-200))]",
        bgCss: " bg-[rgb(var(--bg-green-200)/5%)]",
      };
      break;
    case "purple":
      optionObject = {
        borderCss: "hover:ring-2 hover:ring-[rgb(var(--bg-purple-200))]",
        active: "border-2 border-[rgb(var(--bg-purple-200))]",
        bgCss: " bg-[rgb(var(--bg-purple-200)/5%)]",
      };
      break;
    case "default":
      optionObject = {
        borderCss: "hover:ring-2 hover:ring-[var(--primary-color)]",
        active: "border-2 border-[var(--primary-color)]",
        bgCss: " bg-[var(--primary-accent-color)]",
      };
      break;
    case "blue":
      optionObject = {
        borderCss: "hover:ring-2 hover:ring-[rgb(var(--bg-blue-100))]",
        active: "border-2 border-[rgb(var(--bg-blue-100))]",
        bgCss: " bg-[rgb(var(--bg-blue-100)/5%)]",
      };
      break;
    case "lightgreen":
      optionObject = {
        borderCss: "hover:ring-2 hover:ring-[rgb(var(--bg-green-100))]",
        active: "border-2 border-[rgb(var(--bg-green-100))]",
        bgCss: " bg-[rgb(var(--bg-green-100)/5%)]",
      };
      break;
    case "yellow":
      optionObject = {
        borderCss: "hover:ring-2 hover:ring-[rgb(var(--bg-yellow-100))]",
        active: "border-2 border-[rgb(var(--bg-yellow-100))]",
        bgCss: " bg-[rgb(var(--bg-yellow-100)/5%)]",
      };
      break;
    default:
      optionObject = {
        borderCss: "hover:ring-2 hover:ring-[var(--primary-color)]",
        active: "border-2 border-[var(--primary-color)]",
        bgCss: " bg-[var(--primary-accent-color)]",
      };
      break;
  }

  return (
    <div
      className={cn(
        "capitalize cursor-pointer transition-all flex items-center duration-300 bg-white h-[121px] w-full pl-[28px] pr-3 py-[26.5px] rounded-lg light-effect-shadow",
        isActive ? optionObject.active : optionObject.borderCss
      )}
      {...props}
    >
      <div className="flex gap-x-[18px]">
        <div
          className={cn(
            "w-[62px] h-[61px] rounded-lg grid place-content-center ",
            optionObject.bgCss
          )}
        >
          {icon && <Image src={icon} alt="icon" />}
          {svg && svg}
        </div>
        <div className="capitalize space-y-1.5">
          <h5 className=" text-xs font-normal text-[var(--text-color2)]">
            {title}
          </h5>
          <p className="text-3xl font-semibold text-[var(--text-color3)]">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
}
