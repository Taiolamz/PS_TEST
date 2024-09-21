import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardPropType = {
  option?: "darkgreen" | "purple" | "blue" | "lightgreen" | "yellow";
  svg?: ReactNode;
  onClick?: () => void;
  content?: ReactNode;
  title?: ReactNode;
  isActive?: boolean;
};

export default function MetricCard2({
  option,
  svg,
  title,
  content,
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
        borderCss: "hover:ring-2 hover:ring-[rgb(var(--bg-green-200))]",
        active: "border-2 border-[rgb(var(--bg-green-200))]",
        bgCss: " bg-[rgb(var(--bg-green-200)/5%)]",
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
        <div className={cn("w-[62px] h-[62px] grid place-content-center ")}>
          {svg}
        </div>
        <div className="capitalize space-y-1.5">
          <h5 className="">{title}</h5>
          <p className="">{content}</p>
        </div>
      </div>
    </div>
  );
}
