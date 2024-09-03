"use client"

import DashboardLayout from '@/app/(dashboard)/_layout/DashboardLayout';
import { PageLoader } from '@/components/custom-loader';
import { GraySkeleton } from '@/public/assets/icons';
import { useGetMissionPlanTemplatesQuery } from '@/redux/services/checklist/missionPlanTemplateApi';
import routesPath from '@/utils/routes';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const { ADMIN } = routesPath

const ChooseTemplate = () => {
    const { data: missionPlanTemplateData, isLoading } =
    useGetMissionPlanTemplatesQuery({currentPage:3});

    const router = useRouter()
  // CREATE TEMPLATE
  const createTemplate = (
    <div
      onClick={() => {
        localStorage.removeItem('selected-mission-plan-template')
        localStorage.removeItem('selected-mission-plan-template-review')
        router.push(`${ADMIN.CREATE_MISSION_PLAN_TEMPLATE}?qs=kick-start-fy`)
      }}
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
    <DashboardLayout headerTitle="Mission Plan" 
    back
    // onBack={() => router.push(ADMIN.MISSION_PLAN)}
    >
        <div className="flex flex-col p-5 w-full">
        <p className="text-lg font-medium">Templates</p>
        <>
            {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
                <PageLoader />
            </div>
            ) : (
            <div className=" mt-5 w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-7 ">
                {createTemplate}
                {missionPlanTemplateData?.map((chi, idx) => {
                const { name } = chi;
                return (
                    // <Link
                    //   key={idx}
                    //   // href={path}
                    //   className="h-[199px] hover:border-primary transition-all duration-300 border border-custom-gray group bg-custom-light-gray-100 cursor-pointer flex flex-col pl-8 justify-center"
                    // >
                    <div
                    key={idx}
                    className="h-[199px] hover:border-primary transition-all duration-300 border border-custom-gray group bg-custom-light-gray-100 cursor-pointer flex flex-col pl-8 justify-center"
                    onClick={() => {
                        // router.push(`${ADMIN.CREATE_MISSION_PLAN_TEMPLATE}?qs=kick-start-fy`);
                        localStorage.setItem(
                        "selected-mission-plan-template-review",
                        JSON.stringify(chi)
                        );
                    }}
                    >
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-5">
                        <p className="w-[107px] text-black mb-3 font-normal text-sm capitalize">
                            {name}
                        </p>
                        {/* <p className="text-center">{content}</p> */}
                        </div>
                        <Image src={GraySkeleton} alt={name} />
                    </div>
                    </div>
                    // </Link>
                );
                })}
            </div>
            )}
        </>
        </div>
    </DashboardLayout>
  );
}

export default ChooseTemplate;
