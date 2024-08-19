"use client";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { DefaultCheckIcon, DefaultRightArrowIcon } from "@/public/assets/icons";
import { useAppSelector } from "@/redux/store";
import { formatChecklistPercent, processInputAsArray } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
// import { checklistDetails } from "../checklist-steps";

const ChecklistOverviewContent = () => {
  const [progress, setProgress] = React.useState(13);
  const actionCtx = useContext(ActionContext);
  const { user, checklist } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isCardOneChecked, setIsCardOneChecked] = useState<boolean>(false);
  const { ADMIN } = routesPath;

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    // document.documentElement.style.setProperty(
    //   "--primary-color",
    //   e.hex
    // );
    const color = user?.organization?.brand_colour || ("" as any);
    actionCtx?.setPrimaryColorVals(color);
    // console.log(user);
  }, [user]);
  // console.log(user?.organization?.hierarchy);

  const checklistDetails = [
    {
      title: "Set up organization structure",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      items: [
        {
          isChecked: checklist?.subsidiary_count < 1 ? false : true,
          label: "Add Subsidiary",
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "subsidiary"
          )
            ? true
            : false,
          link: ADMIN?.CREATE_SUBSIDIARY,
        },
        {
          isChecked: checklist?.branch_count < 1 ? false : true,
          label: "Add Branches",
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "branch"
          )
            ? true
            : false,
          link: ADMIN?.CREATE_BRANCH,
        },
        {
          isChecked: checklist?.department_count < 1 ? false : true,
          label: "Add Department",
          link: ADMIN?.CREATE_DEPARTMENT,
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "department"
          )
            ? true
            : false,
        },
        {
          isChecked: checklist?.unit_count < 1 ? false : true,
          label: "Add Unit",
          hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "unit"
          )
            ? true
            : false,
          link: ADMIN?.CREATE_UNIT,
        },
      ],
      isAllChecked: isCardOneChecked,
      // path: ADMIN.SUBSIDIARY,
      // link: ADMIN?.CREATE_S,
    },
    {
      title: "Set up employee and roles",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      // isChecked: checklist?.employee_count < 1 ? false : true,
      path: ADMIN.ADD_EMPLOYEE,
      hide: false,
      isAllChecked: checklist?.employee_count < 1 ? false : true,
    },
    {
      title: "Set up mission plan",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      items: [
        {
          isChecked: checklist?.mission_flow_exist,
          label: "Create Mission Plan Template",
          hide: false,
          link: routesPath?.ADMIN?.MISSION_PLAN_TEMPLATE_LEVEL,
          // link: routesPath?.ADMIN?.CREATE_MISSION_PLAN_TEMPLATE,
        },
        {
          isChecked: checklist?.approval_flow_exist,
          label: "Approval Flow",
          hide: false,
          link: routesPath?.ADMIN?.CREATE_MISSION_PLAN_APPROVAL_FLOW,
        },
      ],
      isAllChecked:
        checklist?.mission_flow_exist && checklist?.approval_flow_exist
          ? true
          : false,
    },
  ];

  const getListToUse = (list: any) => {
    if (list?.length > 0) {
      const newList = list?.filter((chi: any) => !chi?.hide);
      // console.log(newList);
      return newList;
    }
  };

  const getNextLink = (list: any) => {
    if (list?.length > 0) {
      const newList = list?.filter((chi: any) => !chi?.isChecked);
      // console.log(newList);
      return newList;
    }
  };

  useEffect(() => {
    if (Object?.keys(user)?.length) {
      if (getNextLink(getListToUse(checklistDetails[0]?.items))?.length < 1) {
        setIsCardOneChecked(true);
      }
    }
  }, [user]);

  const getValueNum = (param: any) => {
    let value;
    if (param) {
      const val = Number(param);
      value = val;
    } else {
      value = 0;
    }
    // console.log(value);

    return value;
  };

  const getPercentageFunc = () => {
    const posibleTotal =
      getValueNum(checklist?.branch_count) +
      getValueNum(checklist?.subsidiary_count) +
      getValueNum(checklist?.unit_count) +
      getValueNum(checklist?.department_count);
    const totalValue = getListToUse(checklistDetails[0]?.items)?.length + 3;
    const totalPercentage = Math.round((posibleTotal / totalValue) * 100);
    // console.log(totalPercentage);
    return totalPercentage;
    // console.log(posibleTotal);
    // console.log(totalValue);
  };

  return (
    <div
      onClick={() => {
        // getPercentageFunc();
        console.log(checklist);
        console.log(user?.organization?.hierarchy);
        // console.log(getPercentageFunc());
      }}
      className="flex flex-col gap-3 w-[768px]"
    >
      <div className="flex gap-2 items-center justify-between bg-primary p-3 px-5 pl-8">
        <div className="flex flex-col gap-1">
          <p className="text-custom-gray-scale-white font-semibold text-lg">
            Complete your checklist
          </p>
          <p className="text-custom-gray-scale-white font-light text-[11px]">
            Get your account running, by completing the following steps
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-warning text-sm">{`${
            formatChecklistPercent(checklist?.completion_percent) || 0
          }% completed`}</p>
          <Progress
            value={formatChecklistPercent(checklist?.completion_percent)}
            className="w-[150px] h-2 bg-custom-bg *:bg-warning"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-1">
        {checklistDetails?.map((chi, idx) => {
          const { title, subTitle, items, isAllChecked, path } = chi;
          return (
            <div
              key={idx}
              onClick={() => {
                if (!isAllChecked && Number(items?.length) > 0 && idx === 0) {
                  router?.push(getNextLink(getListToUse(items))[0]?.link);
                  return;
                  // console.log("first");
                }
                if (
                  getNextLink(getListToUse(checklistDetails[0]?.items))
                    ?.length < 1 &&
                  !items &&
                  path &&
                  !isAllChecked &&
                  idx === 1
                ) {
                  router?.push(ADMIN.ADD_EMPLOYEE);
                }
                if (
                  Number(checklist?.employee_count) > 1 &&
                  getNextLink(getListToUse(checklistDetails[0]?.items))
                    ?.length < 1 &&
                  !isAllChecked &&
                  Number(items?.length) > 0 &&
                  idx === 2
                ) {
                  router?.push(getNextLink(getListToUse(items))[0]?.link);
                  return;
                }
              }}
              className="bg-custom-gray-scale-white p-10 pl-8 hover:scale-[1.02] transition-all duration-300"
              style={{ cursor: isAllChecked ? "pointer" : "pointer" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  <Checkbox
                    checked={isAllChecked}
                    className="border-[1px] shadow-none rounded-full h-5 w-5 border-custom-gray mt-[.1rem]"
                  />
                  <div className="flex flex-col">
                    <p className="text-custom-dark-gray font-medium text-base leading-5">
                      {title}
                    </p>
                    <p className="text-custom-gray-scale-400 font-light text-[11px]">
                      {subTitle}
                    </p>
                  </div>
                </div>
                {!isAllChecked && (
                  <Image
                    src={DefaultRightArrowIcon}
                    alt="default right arrow"
                    className="hover:translate-x-[3px] transition-all duration-300"
                  />
                )}
              </div>
              <div className="pl-5 flex flex-col gap-3 mt-5">
                {getListToUse(items)?.map((chi: any, idx: any) => {
                  const { isChecked, label } = chi;
                  return (
                    <div key={idx} className="flex gap-2 items-center">
                      <DefaultCheckIcon
                        fill={isChecked ? "var(--primary-color)" : ""}
                      />
                      <p
                        style={{
                          color: isChecked ? "var(--primary-color)" : "",
                          fontWeight: isChecked ? 700 : 400,
                        }}
                        className="font-light text-xs"
                      >
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistOverviewContent;
