import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { MissionContentDetails, missionContentModal } from "./checklist-steps";
import { usePathname } from "next/navigation";
import routesPath from "@/utils/routes";

interface Prop {
  onSelect: () => void;
}
const { ADMIN } = routesPath;

const MissionPlanTemplateModal = ({ onSelect }: Prop) => {
  const [missionContent, setMissionContent] = useState(missionContentModal);

  const handleActiveMissionPlan = (label: string) => {
    setMissionContent((prevContent) =>
      prevContent.map((item) =>
        item.label === label
          ? item.isRequired
            ? { ...item, isSelected: true }
            : { ...item, isSelected: !item.isSelected }
          : item
      )
    );
  };

  console.log(missionContentModal, "mission content modal");
  // console.log(missionContentModal, "mission content modal");

  const handleIsAnySelected = () => {
    const isAnySelected = missionContent.some((item) => item.isSelected);
    return isAnySelected;
  };

  const handleAddSelected = () => {
    const selectedLabels = missionContent.map((item) => {
      return {
        ...item,
      };
    });
    localStorage.setItem(
      "selected-mission-plan-template",
      JSON.stringify(selectedLabels)
    );
    onSelect();
  };

  const location = usePathname();

  const handleGetMissionPlanTemplates = () => {
    const selectedMissionPlanTemplates = localStorage.getItem(
      "selected-mission-plan-template"
    );
    if (selectedMissionPlanTemplates) {
      setMissionContent(JSON.parse(selectedMissionPlanTemplates));
    }
  };

  const handleGetMissionPlanReviewTemplate = () => {
    const selectedMissionPlanTemplates = localStorage.getItem(
      "selected-mission-plan-template-review"
    );

    if (selectedMissionPlanTemplates) {
      const parseData = JSON.parse(selectedMissionPlanTemplates);
      const sortedArray = Object.values(parseData as any[]).sort(
        (a, b) => a?.order - b?.order
      );

      const filteredArray = sortedArray?.filter(
        (_, index) => index !== 0 && index !== 1 && index !== 2
      );
      const newFilteredArray = filteredArray.filter(
        (item) => typeof item === "object" && item !== null
      );
      // console.log(newFilteredArray, "newFilteredArray");
      // // setMissionContent(newFilteredArray);

      const mergedArray = missionContentModal.map((item) => {
        const matchingItem = newFilteredArray.find(
          (newItem) => newItem.id === item.id
        );
        return matchingItem ? { ...item, ...matchingItem } : item;
      });
      setMissionContent(mergedArray);
      console.log(mergedArray, "array merging");
    }
  };

  console.log(missionContent, "main mission content");
  const handleFormatMergedArray = () => {
    const selectMissionTemplate = localStorage.getItem(
      "selected-mission-plan-template"
    );
    if (selectMissionTemplate) {
      const parseArray = JSON.parse(selectMissionTemplate);
      console.log(parseArray, "parsed array");
      const firstArray = Object.values(parseArray as any[]).filter(
        (item) => typeof item === "object" && item?.id
      );
      console.log(firstArray, "first array");
      console.log(missionContent, "mission content suspect");
      const mergedArray = firstArray
        .map((item1) => {
          const matchingItem = missionContent.find(
            (item2) => item2.id === item1.id
          );

          if (matchingItem && item1.isSelected && matchingItem.isSelected) {
            return null;
          }

          return {
            ...item1,
            ...matchingItem,
          };
        })
        .filter((item) => item !== null);
      console.log(mergedArray, "merging top array");
      // return mergedArray;
    }
  };

  console.log(handleFormatMergedArray(), "doings");

  console.log(missionContentModal, "mission content select");

  useEffect(() => {
    if (location === ADMIN.CREATE_MISSION_PLAN_TEMPLATE) {
      handleGetMissionPlanTemplates();
    } else if (location === ADMIN.VIEW_MISSION_PLAN_TEMPLATE) {
      handleGetMissionPlanReviewTemplate();
    }
  }, []);

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
          const { content, label, isSelected, id, isRequired } = chi;
          return (
            <div
              key={idx}
              onClick={() => handleActiveMissionPlan(label)}
              className={`${
                isSelected ? "bg-[var(--primary-color)]" : "bg-white"
              }  flex flex-col gap-2 ${
                isRequired
                  ? "cursor-not-allowed bg-[var(--primary-color)]"
                  : "cursor-pointer"
              } group hover:bg-[var(--primary-color)] shadow-custom-box-shadow-100 transition-all duration-300 p-5 border-0 rounded-lg`}
            >
              <p
                className={`${
                  isSelected ? "text-white" : "text-custom-dark-blue"
                }  group-hover:text-white font-medium relative flex text-sm`}
              >
                {label}
                {isRequired ? (
                  <span className="ml-1 text-red-400">*</span>
                ) : null}
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
