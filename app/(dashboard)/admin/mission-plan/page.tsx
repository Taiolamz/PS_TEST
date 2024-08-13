"use client"
import { GrayPlusIcon, StatsIcon } from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Dictionary } from "@/@types/dictionary";
import { PageLoader } from "@/components/custom-loader";
import { EmptyState, ReusableDrawer } from "@/components/fragment";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useGetOrganizationMissionPlansQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CAN_CREATE_FINANCIAL_YEAR, SUPER_ADMIN } from "@/utils/helpers";
import { formatDate } from "@/utils/helpers/date-formatter";
import routesPath from "@/utils/routes";
import DashboardLayout from "../../_layout/DashboardLayout";
import YearMissionPlanCard from "./_components/year-mission-plan-card";
import { allemployeeColumns, allemployeeData } from "./_data/all-employee-table-data";
import { AllEmployees } from "./_tabs";

// Mocking authenticated user role
// ROLES = 
const AUTH_USER_ROLE = {
  ADMIN: "admin",
  MANAGIN_DIRECTOR: "director",
  LINE_MANAGER: "line-manager",
  EMPLOYEE: "employee",

};

const { ADMIN } = routesPath

export default function Page() {

  // const { data: allRoles, isLoading: isLoadingRoles } = useGetAllRolesQuery({})
  const { data: all_mission_plans, isLoading: isLoadingMissionPlans, isFetching: isFetchingMissionPlans } = useGetOrganizationMissionPlansQuery({})
  const user_info = useAppSelector((state) => state?.auth?.user);

  // console.log(all_mission_plans?.data?.fiscal_years)

  const kickstartcard = (
    <Link
      href="mission-plan/kickstart?ui=financial-year"
      className="bg-white h-[140px] border bg-transparent rounded-[5px] border-custom-gray group hover:border-primary transition-all duration-300 p-4 cursor-pointer"
    >
      <div className="flex justify-between">
        <Image className="" src={StatsIcon} alt="plus" />
        <Image
          className="group-hover:scale-[1.02] transition-all duration-300"
          src={GrayPlusIcon}
          alt="plus"
        />
      </div>
      <div className="text-custom-gray-scale-400 mt-5 font-normal text-base ">
        Kickstart New <br /> Mission Plan
      </div>
    </Link>
  );

  const location = usePathname()
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const ui = searchParams.get("ui");

  return (
    <DashboardLayout headerTitle="Mission Plan">
      {/* <div className="p-5 w-full">
        <CustomTab options={PAGE_TABS.MANAGIN_DIRECTOR} slug="ui" />
      </div> */}
      {
        isLoadingMissionPlans || isFetchingMissionPlans ? (
          <div className="h-full grid place-content-center">
            <PageLoader/>
          </div>
        ) :
        <div className="flex flex-col p-5 w-full">
          {
            ui == "mission-plan" &&
            (all_mission_plans?.data?.fiscal_years?.length === 0 ?
              <>
                {CAN_CREATE_FINANCIAL_YEAR?.includes(user_info?.role as string) && (
                  <EmptyState
                    text="Create your Mission plan by using the button below"
                    handleClick={() => router.push("mission-plan/kickstart?ui=financial-year")}
                    btnText="Kickstart Financial Year"
                  />
                )}
                {user_info?.role !== SUPER_ADMIN && (
                  <EmptyState
                    text="Fiscal Year not available"
                  >
                    {/* <div className="flex flex-col gap-3">
                      <Button
                        onClick={() => router.push("mission-plan/create?ui=overview")}
                      >Create Mission Plan </Button>
                      {authUserRole === AUTH_USER_ROLE.MANAGIN_DIRECTOR && <Button variant="outline"> Assign Task </Button>}
                    </div> */}
                  </EmptyState>
                )}

              </>

              :
              <div className="w-full grid grid-cols-4 gap-4">
                {CAN_CREATE_FINANCIAL_YEAR?.includes(user_info?.role as string) && kickstartcard}
                {
                  all_mission_plans?.data?.fiscal_years?.map((item: Dictionary, idx: number) => (
                    <YearMissionPlanCard 
                      key={idx} 
                      status={item?.status} 
                      title={item?.title}
                      created_by={item?.created_by}
                      date={formatDate(item?.created_at)}
                      handleClick={() => {
                        dispatch(updateMissionPlanDetails({slug: 'active_fy_info', data: item}))
                        router.push(`${ADMIN.SINGLE_MISSION_PLAN}?id=${item?.id}`)
                      }} 
                    />
                  ))
                }
              </div>)
          }

          {/* This section shows screens base on active tab*/}
          {ui == "all-employees" && <AllEmployees data={allemployeeData} columns={allemployeeColumns} />}
        </div>
      }
    </DashboardLayout>
  );
}
