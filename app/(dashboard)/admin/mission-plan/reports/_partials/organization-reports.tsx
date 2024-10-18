import { Dictionary } from "@/@types/dictionary";
import CustomSelect from "@/components/custom-select";
import { AchievementProgress, ActionLabel, CardContainer, Legend, LottieAnimation, PercentageLabel, ReusableLabel, ReusableProgressLabel, ReusableSegmentProgress, SingleExcutiveProgress } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { getProgressColorByValue, getStatusData, getTotalByKey, toWholeNumber } from '@/utils/helpers';
import { ArrowRight } from "iconsax-react";
import { Filter, Undo2 } from "lucide-react";
import { ACHIEVEMENT_PROGRESS_DATA, MOS_LABEL_TYPES, PAGE_LEGEND, SPECIFIED_TASK_CHART_LABELS } from "../_data";
import SpecifiedTaskChart from "../_charts/specified-task";
import Link from "next/link";
import routesPath from "@/utils/routes";
import { exportIcon, filterIcon, undoIcon } from "@/public/svgs";
import { useRouter } from "next/navigation";
import { useGetMissionPlanReportCycleQuery, useGetOrgFiscalYearQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useGetAdminOrganizationTargetQuery, useGetOrganizationSpecifiedTaskProgressQuery, useGetTopLevelExecutiveMissonPlanQuery } from "@/redux/services/mission-plan/reports/admin/adminMPReportApi";
import { FileIcon } from "@/public/assets/icons";
import Image from "next/image";
import { PageLoader } from "@/components/custom-loader";
import { cn } from "@/lib/utils";
import { LottieEmptyState } from "@/lottie";
import { useState } from "react";
import CardSkeletonLoader from "@/components/card-loader";

const { ADMIN } = routesPath

const OrganizationReports = () => {
    const router = useRouter()
    const [payload, setPayload] = useState({
        fiscal_year: "",
        cycle: ""
    })

    const { data, isLoading, isFetching } = useGetMissionPlanReportCycleQuery();
    const { data: org_mission_plan, isLoading: isLoadingOrgMP, isFetching: isFetchingOrgMP } = useGetAdminOrganizationTargetQuery({
        params: {
            is_admin: true,
            fiscal_year: payload.fiscal_year,
            cycle: payload.cycle
        }
    })

    const { data: executives_mission_plan, isLoading: isLoadingExecutivesMP, isFetching: isFetchingExecutivesMP } = useGetTopLevelExecutiveMissonPlanQuery({
        fiscal_year_id: payload.fiscal_year
    })

    const ACHIEVEMENT_AVERAGE = org_mission_plan?.data?.achievement_average ?? 0
    const TASK_COMPLETION = org_mission_plan?.data?.task_completion ?? []
    const TARGET_MOS = org_mission_plan?.data?.target_measure_of_success ?? []

    console.log(TASK_COMPLETION)

    const handleFormatCycle = () => {
        const cycles = (data?.data?.cycles as any[])?.map((chi) => {
            return {
                label: chi,
                value: chi,
            };
        });
        return cycles;
    };

    const {
        data: orgFiscalYearDrop,
        isLoading: isLoadingOrgFiscalYearDrop,
        isFetching: isFetchingOrgFiscalYearDrop,
    } = useGetOrgFiscalYearQuery();

    const handleFiscalYearDrop = () => {
        const fiscalYearDrop = (
            orgFiscalYearDrop?.data?.fiscal_years as any[]
        )?.map((chi) => {
            return {
                label: chi?.title,
                value: chi?.id,
            };
        });
        return fiscalYearDrop;
    };

    return (
        <div className="w-full">
            {
                isLoading || isFetching ? (
                    <div className="h-screen grid place-content-center">
                        <PageLoader />
                    </div>
                ) : (
                    <>
                        <CardContainer className="mt-6">
                            <div className="flex items-center gap-6">
                                <ActionLabel label='Filter' icon={filterIcon} iconPosition='right' />

                                <div className="w-full flex flex-wrap items-center gap-">
                                    {/* <CustomSelect
                                        options={[
                                            { label: 'All', value: 'All' },
                                            { label: 'Zojatech', value: 'Zojatech' },
                                        ]}
                                        placeholder="Select Subsidiary"
                                        selected=""
                                        setSelected={() => null}
                                        className="w-[11rem] lg:rounded-s-xl rounded-e-none border-r-0"
                                    />
                                    <CustomSelect
                                        options={[
                                            { label: 'All', value: 'All' },
                                            { label: 'Zojatech Uk', value: 'Zojatech Uk' },
                                        ]}
                                        placeholder="Select Branch"
                                        selected=""
                                        setSelected={() => null}
                                        className="w-[9.5rem] rounded-s-none lg:border-r-0"
                                    />
                                    <CustomSelect
                                        options={[
                                            { label: 'All', value: 'All' },
                                            { label: 'Products', value: 'Finance' },
                                        ]}
                                        placeholder="Select Department"
                                        selected=""
                                        setSelected={() => null}
                                        className="w-[11rem] rounded-none lg:border-r-0"
                                    />
                                    <CustomSelect
                                        options={[
                                            { label: 'All', value: 'All' },
                                            { label: 'Products', value: 'Finance' },
                                        ]}
                                        placeholder="Select Unit"
                                        selected=""
                                        setSelected={() => null}
                                        className="w-[9rem] rounded-none lg:border-r-0"
                                    /> */}
                                    <CustomSelect
                                        options={handleFiscalYearDrop()}
                                        placeholder="Select FY"
                                        selected={payload?.fiscal_year}
                                        setSelected={(value) => {
                                            setPayload((prevData) => {
                                                return { ...prevData, fiscal_year: value };
                                            })
                                        }}
                                        className="w-[9rem]  rounded-none lg:border-r-0"
                                        loading={isLoadingOrgFiscalYearDrop}
                                    />
                                    <CustomSelect
                                        options={handleFormatCycle()}
                                        placeholder="Select Cycle"
                                        selected={payload?.cycle}
                                        setSelected={(value) => {
                                            setPayload((prevData) => {
                                                return { ...prevData, cycle: value };
                                            })
                                        }}
                                        className="w-[9rem] rounded-s-none lg:rounded-e-xl"
                                        loading={isLoading}
                                    />
                                    <ActionLabel label='Reset' icon={undoIcon} className='pl-3 text-red-500' iconPosition='right' labelClass='text-red-500'
                                        onClick={() => {
                                            setPayload((prevData) => {
                                                return {
                                                    ...prevData,
                                                    fiscal_year: "", cycle: ""
                                                };
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            {/* <div className="mt-3 flex justify-end">
                                <Button
                                    className="px-6"
                                >Apply</Button>
                            </div> */}
                        </CardContainer>

                        <div className="mt-6 flex justify-end">
                            <ActionLabel label='Generate Performance Report' icon={exportIcon} iconPosition='left' className='border border-[#E5E9EB] p-3 rounded-[6px] bg-[#FFFFFF] px-6 text-gray-400 hover:text-gray-500' labelClass='text-xs text-[#6E7C87]' />
                        </div>
                        <CardContainer className="mt-3 gap-6">
                            {
                                isLoadingOrgMP || isFetchingOrgMP ? (
                                    <CardSkeletonLoader />
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h1>Organization Task Completion</h1>
                                                {/* <span className="text-xs text-gray-400 font-light">March 2023 - March 31, 2024</span> */}
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-gray-400 font-light">Organization Mission Plan Progress</span>
                                                <ReusableProgressLabel value={toWholeNumber(ACHIEVEMENT_AVERAGE)} />
                                            </div>
                                        </div>
                                        <div className="my-6">
                                            <ReusableSegmentProgress
                                                value={50}
                                                segments={getStatusData(TASK_COMPLETION)}
                                                height={10}
                                                borderRadius={2}
                                            />
                                            {
                                                TARGET_MOS?.length ? (
                                                    <div className="mt-6 flex items-center justify-between w-[90%]">
                                                        <div className="flex">
                                                            <div className="pt-10 flex flex-col">
                                                                <span className="font-light">Specified Task Activity Breakdown</span>
                                                                <Link href={ADMIN.MISSION_PLAN_REPORT_SPECIFIED_TASK('ksksbsmdsadoao')} className="mt-2 block text-[14px] font-medium !text-[var(--primary-color)]">Click here to see All Tasks</Link>
                                                            </div>
                                                            <SpecifiedTaskChart data={getStatusData(TASK_COMPLETION)} />
                                                        </div>
                                                        <div className="">
                                                            <ReusableLabel title="Total" value={`${getTotalByKey(getStatusData(TASK_COMPLETION), "total")} Specified Task(s)`} />
                                                            <div className="mt-4 flex flex-col gap-4">
                                                                {
                                                                    getStatusData(TASK_COMPLETION)?.map((item: Dictionary) => (
                                                                        <Legend key={item?.status} title={item?.status} value={`: ${item?.total}`} color={
                                                                            item?.status === 'Completed' ? 'green' : item?.status === "In Progress" ? "yellow" :
                                                                                item?.status === 'Overdue' ? 'red' : "brown"
                                                                        } />
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) :
                                                    <div className="h-[20rem] flex justify-center items-center">
                                                        <div>
                                                            <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
                                                            <p className="text-sm text-[var(--text-color3)]">No Record found</p>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </>
                                )
                            }

                        </CardContainer>

                        <CardContainer className="mt-6">
                            {
                                isLoadingOrgMP || isFetchingOrgMP ? (
                                    <CardSkeletonLoader />
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h1>Organization Measure of Success</h1>
                                                {TARGET_MOS?.length ? <ReusableProgressLabel value={(toWholeNumber(getTotalByKey(TARGET_MOS, "achieved_percentage") / TARGET_MOS?.length))} /> : ""}
                                                {/* <PercentageLabel color="yellow" value={52} label="Archieved" /> */}
                                            </div>
                                            <Link href={(TARGET_MOS.length || isLoading || isFetching) ? ADMIN.MISSION_PLAN_REPORT_MEASURE_OF_SUCCESS('sjnakdkbkbmam') : ""}>
                                                <Button disabled={isLoading || isFetching || !TARGET_MOS.length} className="flex gap-3 items-center group">
                                                    <p className="font-medium">See Details</p>
                                                    <figure className="group-hover:translate-x-1 transition-all">
                                                        {arrowRight}
                                                    </figure>
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="my-6">
                                            <div className="w-2/3 flex gap-3">
                                                <div className="w-fit">
                                                    <Legend title="Target" color="purple" />
                                                </div>
                                                <div className="border rounded-sm flex gap-4 p-1">
                                                    {
                                                        MOS_LABEL_TYPES?.map((item: Dictionary) => (
                                                            <Legend key={item?.title} title={item?.title} color={item?.color as any} barWidth={20} titleClass="text-xs" />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="mt-4 flex flex-col gap-4">
                                                {
                                                    TARGET_MOS?.length ? TARGET_MOS?.map((item: Dictionary, idx: number) => (
                                                        <AchievementProgress
                                                            key={idx}
                                                            title={item?.measure_of_success?.measure}
                                                            progress_value={toWholeNumber(item?.achieved_percentage)}
                                                            color={getProgressColorByValue(toWholeNumber(item?.achieved_percentage))}
                                                            target={item?.target}
                                                            targetColor={"#6B51DF"}
                                                        />
                                                    )) :
                                                        <div className="h-[20rem] flex justify-center items-center">
                                                            <div>
                                                                <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
                                                                <p className="text-sm text-[var(--text-color3)]">No Record found</p>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </CardContainer>

                        <CardContainer className="mt-6 p-0">
                            <div className="border-b p-5">
                                <h1>Top Level Executive Mission Plan Progress</h1>
                            </div>
                            <div className="p-5">
                                {
                                    isLoadingExecutivesMP || isFetchingExecutivesMP ? (
                                        <CardSkeletonLoader />
                                    ) :
                                        executives_mission_plan?.data?.executives?.length !== 0 ? executives_mission_plan?.data?.executives?.map((item: Dictionary, idx: number) => {
                                            const { user_id, staff_member_id, mission_plan_id, name, designation, achievement_percentage, email } = item
                                            // console.log(executives_mission_plan?.data?.executives)
                                            return (
                                                <SingleExcutiveProgress
                                                    key={user_id}
                                                    name={name}
                                                    position={designation}
                                                    url={ADMIN.MISSION_PLAN_REPORT_PROGRESS(user_id)}
                                                    // onClick={() => router.push(ADMIN.MISSION_PLAN_REPORT_PROGRESS('ksksbsmdsadoao'))}
                                                    progress={Math.floor(Number(achievement_percentage?.split("%")?.[0]))}
                                                />
                                            )
                                        }
                                        ) :
                                            <div className="flex flex-col justify-center items-center">
                                                <div> <Image src={FileIcon} alt="empty icon" width={50} height={50} /></div>
                                                <p className="text-xs">No data available</p>
                                            </div>
                                }
                            </div>
                        </CardContainer>

                        <CardContainer className="mt-6">
                            <div className="flex items-center gap-4 w-[80%] mx-auto">
                                <span className="w-fit text-sm text-gray-500">Page Legend</span>
                                <div className="flex gap-8">
                                    {
                                        PAGE_LEGEND?.map((item: Dictionary) => (
                                            <Legend key={item?.title} title={item?.title} color={item?.color as any} barHeight={4} barWidth={40} titleClass="text-xs" titleColor="default" />
                                        ))
                                    }
                                    <div className="w-fit flex items-center gap-2 text-gray-500">
                                        <ReusableSegmentProgress
                                            value={100}
                                            segments={[
                                                { percentage: 20, color: "#00a699" },
                                                { percentage: 60, color: "#6a00ff" },
                                                { percentage: 20, color: "#0052cc" },
                                            ]}
                                            borderRadius={1}
                                            width={3}
                                            height={5}
                                        />
                                        <span className="text-xs">Progress</span>
                                    </div>
                                </div>

                            </div>
                        </CardContainer>
                    </>
                )
            }
        </div>
    );
}

export default OrganizationReports;

const arrowRight = (
    <svg
        width="18"
        height="9"
        viewBox="0 0 18 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.8347 8.8457L12.805 7.83096L15.0681 5.56794H0.500977V4.12346H15.0681L12.8197 1.86045L13.8494 0.845703L17.8347 4.8457L13.8347 8.8457Z"
            fill="white"
        />
    </svg>
);
