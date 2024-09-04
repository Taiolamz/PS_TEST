import { GraySkeleton, PlusIcon } from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { missionPlanDetails } from "./checklist-steps";
import { useGetMissionPlanTemplatesQuery } from "@/redux/services/checklist/missionPlanTemplateApi";
import { PageLoader } from "@/components/custom-loader";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";

interface Props {
  handleClick: () => void;
  handleMainClick: () => void;
}

const MissionPlanLevel = ({ handleClick, handleMainClick }: Props) => {
  const user = useAppSelector(selectUser);
  const { data: missionPlanTemplateData, isLoading } =
    useGetMissionPlanTemplatesQuery({});

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

  const defaultTemplate = (
    <div
      onClick={handleMainClick}
      className=" h-[199px]  border border-custom-gray group hover:border-primary transition-all duration-300 bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
    >
      <div className="flex flex-col ml-[2rem]">
        <p className=" text-black mb-3 font-medium text-sm capitalize">
          Default Mission <br /> Plan Template
        </p>
        <Image src={GraySkeleton} alt="default template" />
      </div>
    </div>
  );
  const router = useRouter();
  return (
    <div className="flex flex-col p-5 w-full">
      <p className="text-lg font-medium">Templates</p>
      <>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <PageLoader />
          </div>
        ) : (
          <div className=" mt-5 w-full grid grid-cols-6  gap-7 ">
            {createTemplate}
            {defaultTemplate}
            {missionPlanTemplateData?.map((chi, idx) => {
              const { name } = chi;
              return (
                <div
                  key={idx}
                  className="h-[199px] hover:border-primary transition-all duration-300 border border-custom-gray group bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
                  onClick={() => {
                    router.push(routesPath.ADMIN.VIEW_MISSION_PLAN_TEMPLATE);
                    localStorage.setItem(
                      "selected-mission-plan-template-review",
                      JSON.stringify(chi)
                    );
                  }}
                >
                  <div className="flex flex-col ml-[2rem]">
                    <div className="flex flex-col gap-5">
                      <p className="w-[107px] text-black mb-3 font-medium text-sm capitalize">
                        {name}
                      </p>
                    </div>
                    <Image src={GraySkeleton} alt={name} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default MissionPlanLevel;
