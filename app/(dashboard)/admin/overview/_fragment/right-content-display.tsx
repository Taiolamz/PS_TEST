import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import {
  ArrowRightIcon,
  arrowRight,
  checklistItems,
  missionPlanSubmissionProgress,
  missionstatement,
  sideTodoIcon,
  todoLists,
} from "./items";
import { ReusableProgress } from "@/components/fragment";
import Link from "next/link";

const RightContentDisplay = () => {
  const Frame = ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    return (
      <div
        className={`p-3 py-5 bg-white custom-shadow m-5 rounded-[2px] ${className}`}
      >
        {children}
      </div>
    );
  };

  const todoListEmptyState = (
    <div className="mt-0.5 h-contain flex-1 place-content-center ">
      <div className="text-center space-y-[15px]">
        <p className="text-[var(--text-color2)] font-light">
          You have no to do list
        </p>
        <Button className="py-2 px-8">Create To Do List</Button>
      </div>
    </div>
  );

  return (
    <div className="h-full fixed w-[391px] overflow-auto pt-20 scroll-hidden  right-0 bg-[var(--btn-solid-color)] top-0">
      {/* top item wrap */}
      {false && (
        <Frame>
          <p className="text-[#252C32] font-medium text-base">
            Checklist Items
          </p>
          <div className="flex flex-col gap-4 mt-5">
            {checklistItems.map((chi, idx) => {
              const { label, due_date } = chi;
              return (
                <div key={idx} className="rounded-[5px] p-3 px-5 relative">
                  <div className="absolute inset-0 bg-primary opacity-5 rounded-[5px]"></div>
                  <div className="relative z-10 cursor-pointer group flex justify-between items-center w-full">
                    <div className="flex flex-col gap-3">
                      <p className="text-black font-normal text-sm">{label}</p>
                      <p className="text-[#6E7C87] text-[10px] font-normal">
                        {due_date || "No Due Date"}
                      </p>
                    </div>
                    <figure className="group-hover:translate-x-1 transition-all ease-linear">
                      {arrowRight}
                    </figure>
                  </div>
                </div>
              );
            })}
          </div>
        </Frame>
      )}

      {/* mission and vision statement */}
      <Frame className="flex flex-col gap-5 px-5 py-8 mt-10">
        {missionstatement.map((chi, idx) => {
          const { icon, label, content } = chi;
          return (
            <div key={idx} className="flex gap-3 items-start">
              <figure className="mt-1"> {icon}</figure>
              <div className="flex flex-col gap-2">
                <p className="text-[#252C32] font-medium">{label}</p>
                <p className="text-[#9AA6AC] text-xs font-light">{content}</p>
              </div>
            </div>
          );
        })}
      </Frame>

      {/* mission plan submission progress */}
      <Frame className="flex flex-col gap-5 px-8 ">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2  mb-2">
              <div>
                <p className="text-black">
                  Mission Plan Submission Progress 2023
                </p>
                <p className="text-[#9AA6AC] text-xs font-light mt-2">{`March 2023 - March 31, 2024`}</p>
              </div>
            </div>
            <p className="text-green-800 font-medium text-2xl">{68}%</p>
          </div>
          <ReusableProgress
            value={68}
            height={6}
            color={"green"}
            borderRadius={4}
            className="!bg-[#0080803D]"
            progressClass="rounded-[2px]"
          />
        </div>
      </Frame>

      {/* to do list */}
      <Frame className="min-h-[450px] flex flex-col">
        <div className="bg-[var(--primary-accent-color)] rounded-[5px] py-[5px] px-[7px] cursor-pointer mb-0.5">
          <p className="bg-white py-[5.5px] rounded-sm flex justify-center items-center gap-x-2.5 text-[var(--primary-color)] font-medium">
            {sideTodoIcon} To-do List
          </p>
        </div>
        {/* {todoListEmptyState} */}
        {todoLists?.length > 0 ? (
          <div className=" flex flex-col gap-3 mt-5">
            {todoLists.map((chi, idx) => {
              const { label, content, date, due_date, bgColor, color } = chi;
              return (
                <div
                  key={idx}
                  className="p-4 group cursor-pointer rounded-[5px] px-5 flex justify-between gap-7 items-center"
                  style={{
                    backgroundColor: bgColor,
                    borderLeft: `2px solid ${color}`,
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-black">{label}</p>
                    <p className="text-[#6E7C87] text-xs ">{content}</p>
                    <div className="flex gap-2 items-center">
                      <p className="font-light text-[#6E7C87] text-xs">
                        {date}
                      </p>
                      <span
                        className="h-[6px] w-[6px] rounded-[12px]"
                        style={{ backgroundColor: color }}
                      ></span>
                      <p className="text-[10px]" style={{ color: color }}>
                        Due in {due_date} days
                      </p>
                    </div>
                  </div>
                  <div className="group-hover:translate-x-1 transition-all ease-linear">
                    <ArrowRightIcon color={color} />
                  </div>
                </div>
              );
            })}
            <Link
              href="#"
              className="mt-3 border border-primary w-full text-primary text-medium text-center p-2 rounded-sm"
            >
              View all To do’s
            </Link>
          </div>
        ) : (
          todoListEmptyState
        )}
        {/* Empty state for TODO content */}
      </Frame>
    </div>
  );
};

export default RightContentDisplay;
