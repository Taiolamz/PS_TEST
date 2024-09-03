"use client"

import DashboardLayout from '@/app/(dashboard)/_layout/DashboardLayout';
import { PageLoader } from '@/components/custom-loader';
import { GraySkeleton } from '@/public/assets/icons';
import { updateMissionPlanDetails } from '@/redux/features/mission-plan/missionPlanSlice';
import { useGetMissionPlanTemplatesQuery } from '@/redux/services/checklist/missionPlanTemplateApi';
import { useAppDispatch } from '@/redux/store';
import routesPath from '@/utils/routes';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const { ADMIN } = routesPath

const ChooseTemplate = () => {
  const { data: missionPlanTemplateData, isLoading } =
    useGetMissionPlanTemplatesQuery({ page: 2 });

  const router = useRouter()
  const dispatch = useAppDispatch()
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
                  <div
                    key={idx}
                    className="h-[199px] hover:border-primary transition-all duration-300 border border-custom-gray group bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
                    onClick={() => {
                      dispatch(updateMissionPlanDetails({slug: 'active_fy_info', data: {
                        template_id: chi.id
                      }}))
                      router.push(`${ADMIN.VIEW_MISSION_PLAN_TEMPLATE}?qs=template`);
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
    </DashboardLayout>
  );
}

export default ChooseTemplate;
