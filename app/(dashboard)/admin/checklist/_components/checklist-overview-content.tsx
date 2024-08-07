"use client";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { DefaultCheckIcon, DefaultRightArrowIcon } from "@/public/assets/icons";
import { useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
// import { checklistDetails } from "../checklist-steps";

const ChecklistOverviewContent = () => {
  const [progress, setProgress] = React.useState(13);
  const actionCtx = useContext(ActionContext);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

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

  const checklistDetails = [
    {
      title: "Set up organization structure",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      items: [
        {
          isChecked: true,
          label: "Add Subsidiary",
          hide: true,
          link: ADMIN?.CREATE_SUBSIDIARY,
        },
        {
          isChecked: false,
          label: "Add Branches",
          hide: false,
          link: ADMIN?.CREATE_BRANCH,
        },
        {
          isChecked: false,
          label: "Add Department",
          hide: false,
          link: ADMIN?.CREATE_DEPARTMENT,
        },
        {
          isChecked: false,
          label: "Add Unit",
          hide: false,
          link: ADMIN?.CREATE_UNIT,
        },
      ],
      isAllChecked: false,
      // path: ADMIN.SUBSIDIARY,
      // link: ADMIN?.CREATE_S,
    },
    {
      title: "Set up employee and roles",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      isAllChecked: false,
      path: ADMIN.ADD_EMPLOYEE,
      hide: false,
    },
    {
      title: "Set up mission plan",
      subTitle:
        "Manage users that will be joining your organization and how they are inducted",
      items: [
        {
          isChecked: false,
          label: "Create Mission Plan Template",
          hide: false,
          link: routesPath?.ADMIN?.CREATE_MISSION_PLAN_TEMPLATE,
        },
        {
          isChecked: true,
          label: "Approval Flow",
          hide: false,
          link: routesPath?.ADMIN?.CREATE_MISSION_PLAN_APPROVAL_FLOW,
        },
      ],
      isAllChecked: false,
    },
  ];

  const getListToUse = (list: any) => {
    if (list?.length > 0) {
      const newList = list?.filter((chi: any) => !chi?.hide);
      // console.log(newList);
      return newList;
    }
  };

  return (
    <div className="flex flex-col gap-3 w-[768px]">
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
          <p className="text-warning text-sm">0% completed</p>
          <Progress
            value={0}
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
                // console.log(getListToUse(items));
                // console.log(user);
                if (!isAllChecked) {
                  router?.push(getListToUse(items)[0]?.link);
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
