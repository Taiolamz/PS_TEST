"use client"
import DashboardLayout from '@/app/(dashboard)/_layout/DashboardLayout';
import CustomTab from '@/components/custom-tab';
import { useAppSelector } from '@/redux/store';
import { getAvailableTabs, SUPER_ADMIN } from '@/utils/helpers';
import routesPath from '@/utils/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { allemployeeColumns, allemployeeData } from '../_data/all-employee-table-data';
import { AllEmployees } from '../_tabs';
import { FiscalYearInfo, MyMissionPlan } from './_partials';
import { Dictionary } from '@/@types/dictionary';

const { ADMIN } = routesPath

const SingleMissionPlan = () => {

    const { active_fy_info } = useAppSelector((state) => state?.mission_plan?.mission_plan)
    const user_info: Dictionary = useAppSelector((state) => state?.auth?.user);

    const searchParams = useSearchParams();
    // const data = useAppSelector((state) => state?.auth?.user);
    const ui = searchParams.get("ui");
    const router = useRouter()


    return (
        <DashboardLayout
            headerTitle={active_fy_info?.title}
            back
            onBack={() => router.push(`${ADMIN.MAIN_MISSION_PLAN}?ui=mission-plan`)}
        >
            <div style={{ backgroundColor: "rgba(244, 244, 244, 1)" }} className="p-5 w-full global_sticky_class">
                {/* user_info?.role */}
                <CustomTab options={getAvailableTabs({ role: user_info?.role as string, isLineManager: user_info?.is_line_manager as boolean })} slug="ui" />
            </div>

            {
                ui === "mission-plan" && (
                    <>
                        { user_info?.role === SUPER_ADMIN && <FiscalYearInfo/>}
                        {
                            user_info?.role !== SUPER_ADMIN && <MyMissionPlan/>
                        }
                    </>
                )
            }
            {
                ui === "all-employees" && (
                    <div className="p-5">
                        <AllEmployees data={allemployeeData} columns={allemployeeColumns} />
                    </div>
                )
            }
        </DashboardLayout >
    );
}

export default SingleMissionPlan;
