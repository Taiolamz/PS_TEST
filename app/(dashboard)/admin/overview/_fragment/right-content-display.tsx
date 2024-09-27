import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { arrowRight, checklistItems, sideTodoIcon } from "./items";

const RightContentDisplay = () => {
  const Frame = ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    return (
      <div className={`p-3 py-5 bg-white custom-shadow m-5 ${className}`}>
        {children}
      </div>
    );
  };

  return (
    <div className="h-full w-[391px] overflow-auto pt-10 absolute right-0 bg-[var(--btn-solid-color)] top-0">
      {/* top item wrap */}
      <Frame>
        <p className="text-[#252C32] font-medium text-base">Checklist Items</p>
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

      {/* to do list */}
      <Frame className="min-h-[450px] flex flex-col">
        <div className="bg-[var(--primary-accent-color)] rounded-[5px] py-[5px] px-[7px] cursor-pointer mb-0.5">
          <p className="bg-white py-[5.5px] rounded-sm flex justify-center items-center gap-x-2.5 text-[var(--primary-color)] font-medium">
            {sideTodoIcon} To-do List
          </p>
        </div>

        {/* Empty state for TODO content */}
        <div className="mt-0.5 h-contain flex-1 place-content-center ">
          <div className="text-center space-y-[15px]">
            <p className="text-[var(--text-color2)] font-light">
              You have no to do list
            </p>
            <Button className="py-2 px-8">Create To Do List</Button>
          </div>
        </div>
      </Frame>
    </div>
  );
};

export default RightContentDisplay;
