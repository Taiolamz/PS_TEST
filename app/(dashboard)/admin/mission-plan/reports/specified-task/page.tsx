"use client"

import DashboardLayout from '@/app/(dashboard)/_layout/DashboardLayout'
import CustomSelect from '@/components/custom-select';
import { ActionLabel, CardContainer, GridLegend, ReusableProgress, ReusableSegmentProgress } from '@/components/fragment';
import { exportIcon, filterIcon, undoIcon } from '@/public/svgs';
import { getProgressColorByValue } from '@/utils/helpers';
import React from 'react'

export default function OrganizationSpecifiedTask() {

    const segments = [
        {
            percentage: 30,
            color: getProgressColorByValue(30),
        },
        {
            percentage: 60,
            color: "#ffdb57",
        },
        {
            percentage: 90,
            color: getProgressColorByValue(90),
        },
        {
            percentage: 50,
            color: "#ffdb57",
        },
    ];

    const progressDesc = [
        {
            label: "In Progress",
            color: "yellow",
            value: 24,
        },
        {
            label: "Completed",
            color: "green",
            value: 73,
        },
        {
            label: "Under Review",
            color: "blue",
            value: 57,
        },
        {
            label: "Overdue",
            color: "red",
            value: 22,
        },
    ];

    return (
        <DashboardLayout
            headerTitle='Specified Task Overview'
            back
        >
            <section className='p-5'>
                <CardContainer>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ActionLabel label='Filter' icon={filterIcon} iconPosition='right' />

                            <div className="flex items-center">
                                <CustomSelect
                                    placeholder="FY"
                                    options={[]}
                                    selected={""}
                                    setSelected={(e: any) => {
                                        // setFiscalYear(e);
                                    }}
                                    className="w-[150px] text-xs rounded-none rounded-l-[15px]"
                                />
                                <CustomSelect
                                    placeholder="Cycle"
                                    options={[]}
                                    selected={""}
                                    setSelected={(e: any) => {
                                        // setMissionCycle(e);
                                    }}
                                    className="w-[150px] text-xs rounded-none rounded-r-[15px]"
                                />
                            </div>
                            <ActionLabel label='Reset' icon={undoIcon} className='text-red-500' iconPosition='right' labelClass='text-red-500' />
                        </div>

                        {/* -----EXPORT---- */}
                        <ActionLabel label='Export' icon={exportIcon} iconPosition='left' className='border border-[#E5E9EB] p-3 rounded-[6px] bg-[#FFFFFF]' labelClass='text-xs text-[#6E7C87]' />
                    </div>
                </CardContainer>

                <CardContainer className="mt-10">

                    {/* flex flex-col gap-4  */}
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h1>Organization Task Activity</h1>
                            <span className="text-xs text-gray-400 font-light">March 2023 - March 31, 2024</span>
                        </div>
                        <p>Total Tasks: {50}</p>
                    </div>

                    {/* -------MULTI PROGRESS BAR------ */}
                    <div className="mt-10">
                        <ReusableSegmentProgress
                            value={100}
                            height={6}
                            segments={segments}
                        />
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-4 items-center mt-5 ">
                                {progressDesc.map((chi, idx) => {
                                    const { label, color, value } = chi;
                                    return (
                                        <GridLegend
                                            key={idx}
                                            color={color as any}
                                            label={label}
                                            value={value}
                                        />
                                    );
                                })}
                            </div>
                           
                        </div>
                    </div>
                    {/* -------MULTI PROGRESS BAR------ */}
                </CardContainer>

                <h1 className='mt-8'>Organization Specific Task</h1>
                <CardContainer className="relative mt-4 pb-8 border">
                    Implied Task 1
                    <div className='absolute bottom-0 left-0 w-full'>
                        <ReusableProgress value={20} color={getProgressColorByValue(20)} borderRadius={0} valuePosition="float-left" height={20} floatValueClass="16px"/>
                    </div>
                </CardContainer>
            </section>
        </DashboardLayout>
    )
}
