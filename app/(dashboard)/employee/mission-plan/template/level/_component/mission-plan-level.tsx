import { PlusIcon } from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { missionPlanDetails } from "./checklist-steps";

interface Props {
  handleClick: () => void;
}

const MissionPlanLevel = ({ handleClick }: Props) => {
  // CREATE TEMPLATE
  const createTemplate = (
    <div
      onClick={handleClick}
      className=" h-[199px]  border border-custom-gray group hover:border-primary transition-all duration-300 bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
    >
      <div className="flex flex-col gap-5 items-center">
        <p className="text-custom-gray-scale-300 text-center font-normal text-sm ">
          Create New <br />
          Template
        </p>
        <div className="group-hover:scale-[1.02] ">
          <PlusIcon className="stroke-primary transition-all duration-300" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-5 w-full">
      <p className="text-lg font-medium">Templates</p>
      <div className=" mt-5 w-full grid grid-cols-6  gap-7 ">
        {createTemplate}
        {missionPlanDetails.map((chi, idx) => {
          const { label, content, path, icon } = chi;
          return (
            <Link
              key={idx}
              href={path}
              className="h-[199px] hover:border-primary transition-all duration-300 border border-custom-gray group bg-custom-light-gray-100 cursor-pointer flex flex-col pl-8 justify-center"
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-5">
                  <p className="w-[97px] text-black font-normal text-sm ">
                    {label}
                  </p>
                  <p className="text-center">{content}</p>
                </div>
                <Image src={icon} alt={label} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MissionPlanLevel;
