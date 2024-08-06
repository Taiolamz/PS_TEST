import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { missionContentModal } from "../../../checklist-steps";

interface Prop {
  onSelect: () => void;
}

const MissionPlanTemplateModal = ({ onSelect }: Prop) => {
  const [missionContent, setMissionContent] = useState(missionContentModal);

  const handleActiveMissionPlan = (label: string) => {
    setMissionContent((prevContent) =>
      prevContent.map((item) =>
        item.label === label ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleIsAnySelected = () => {
    const isAnySelected = missionContent.some((item) => item.isSelected);
    return isAnySelected;
  };

  const handleAddSelected = () => {
    const selectedLabels = missionContent
      .filter((item) => item.isSelected)
      .map((item) => item.label);
    console.log("Selected labels:", selectedLabels);
    onSelect();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-primary font-medium text-sm">
          What Should be in your Mission plan
        </p>
        <div
          className={`${!handleIsAnySelected() ? "cursor-not-allowed" : ""}`}
        >
          <Button
            onClick={handleAddSelected}
            className={`py-0 px-4 h-[32px] mr-3  transition-all duration-300 font-normal ${
              !handleIsAnySelected()
                ? "border   border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
                : ""
            } `}
            disabled={!handleIsAnySelected()}
          >
            Add Selected
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {missionContent.map((chi, idx) => {
          const { content, label, isSelected } = chi;
          return (
            <div
              key={idx}
              onClick={() => handleActiveMissionPlan(label)}
              className={`${
                isSelected ? "bg-primary" : "bg-white"
              }  flex flex-col gap-2 cursor-pointer group hover:bg-primary shadow-custom-box-shadow-100 transition-all duration-300 p-5 border-0 rounded-lg`}
            >
              <p
                className={`${
                  isSelected ? "text-white" : "text-custom-dark-blue"
                }  group-hover:text-white font-medium text-sm`}
              >
                {label}
              </p>
              <p
                className={` ${
                  isSelected ? "text-white" : "text-custom-gray-scale-300"
                }  group-hover:text-white  text-xs font-light`}
              >
                {content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionPlanTemplateModal;
