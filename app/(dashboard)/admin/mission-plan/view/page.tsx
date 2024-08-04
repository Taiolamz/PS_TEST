"use client"
import DashboardLayout from '@/app/(dashboard)/_layout/DashboardLayout';
import CustomTab from '@/components/custom-tab';
import React from 'react';
import { PAGE_TABS } from '../_data';
import { useParams, useSearchParams } from 'next/navigation';
import { AllEmployees } from '../_tabs';
import { allemployeeColumns, allemployeeData } from '../_data/all-employee-table-data';

const SingleMissionPlan = () => {

    const searchParams = useSearchParams();
    // const data = useAppSelector((state) => state?.auth?.user);
    const ui = searchParams.get("ui");

    return (
        <DashboardLayout
            headerTitle="Mission Plan 2023"
            back
        >
            <div style={{backgroundColor: "rgba(244, 244, 244, 1)"}} className="p-5 w-full global_sticky_class">
                {/* Change the PAGE_TABS here to simulate the different tabs */}
                <CustomTab options={PAGE_TABS.MANAGIN_DIRECTOR} slug="ui" />
            </div>

            {
                ui === "mission-plan" && (
                    <div className="space-y-5 mb-6 px-5 text-[var(--text-color3)]">
                        {/* Financial Year */}
                        <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
                            <h3 className="text-sm font-normal ">1. Financial Year</h3>
                            <div className="grid grid-cols-10 gap-5 mt-4 max-w-4xl">
                                {/* Title */}
                                <div className="col-span-4 space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        Title
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        2022 Financial Year
                                    </p>
                                </div>
                                {/* Start Period */}
                                <div className="col-span-3 space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        Start Period
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        March 2022
                                    </p>
                                </div>
                                {/* End Period */}
                                <div className="col-span-3 space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        End Period
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        Feb 2023
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
                            <h3 className="text-sm font-normal ">2. Mission and Vision</h3>
                            <div className="space-y-7 mt-4 max-w-4xl">
                                {/* Mission */}
                                <div className="space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        Mission
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        To be a pacesetter in digital transformation and software
                                        solutions in West Africa by 2025.
                                    </p>
                                </div>
                                {/* Vision */}
                                <div className="space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        Vision
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        Providing you with innovative software solutions that exceed
                                        your expectations.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
                            <h3 className="text-sm font-normal ">3. Strategic Pillars</h3>
                            <div className="space-y-7 mt-4 max-w-lg">
                                {/* Pillar 1 */}
                                <div className="space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        Pillar 1
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        Brand
                                    </p>
                                </div>
                                {/* Pillar 2 */}
                                <div className="space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        Pillar 2
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        People
                                    </p>
                                </div>
                                {/* Pillar 3 */}
                                <div className="space-y-2">
                                    <h4 className="text-[var(--text-color4)] font-light text-sm">
                                        Pillar 3
                                    </h4>
                                    <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                                        Product
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                ui === "all-employees" && (
                    <div className="p-5">
                        <AllEmployees data={allemployeeData} columns={allemployeeColumns} />
                    </div>
                )
            }
        </DashboardLayout>
    );
}

export default SingleMissionPlan;
