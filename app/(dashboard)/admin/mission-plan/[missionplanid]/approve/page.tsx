"use client";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import SpecifiedTasks from "../../_components/SpecifiedTasks";
import ImpliedTask from "../../_components/ImpliedTask";
import MeasureOfSuccessTable from "../../_components/measureOfSuccessTable";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PresentationView from "./_presentation/presentation-view";
import Comment from "../../_components/Comment";

const ApproveMissionPlan = () => {
  const router = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  return (
    <DashboardLayout headerTitle="Approve Mission Plan" back>
      {!ui ? (
        <div className="py-14 px-[1.625rem]">
          <div className="flex justify-between mb-7">
            <div className="flex items-center gap-[0.5625rem]">
              <h1 className="font-semibold text-lg text-[#3E4345]">
                Oluwaseyi Ajayi Mission Plan
              </h1>
              <Button
                type="button"
                variant="outline"
                className="border-primary text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent"
                onClick={() => {
                  router.push(`${location}?ui=presentation&step=1`);
                }}
              >
                View Presentation Mode
              </Button>
            </div>
            <Button>Approve All</Button>
          </div>
          <div className="flex flex-col gap-10 text-[#162238]">
            {/* Mission Statement */}
            <section>
              <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
                <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                  Mission Statement
                </h2>
                <div className="flex justify-between items-end w-full">
                  <p className="w-[52%]">
                    My MISSION PLAN Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Feugiat sit sed at neque. Semper
                    suspendisse diam habitant pulvinar arcu, mi.
                  </p>
                  <div className="flex gap-2.5 mr-4">
                    <Button
                      variant="outline"
                      className="border-[#FF5855] text-[#FF5855]"
                    >
                      Reject
                    </Button>
                    <Button>Approve</Button>
                  </div>
                </div>
              </div>
              <Comment label="Mission statement" />
            </section>

            {/* Measure of Success */}
            <section>
              <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
                <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                  Measure of Success
                </h2>
                <div className="flex justify-between items-end">
                  <div className="basis-3/4">
                    <MeasureOfSuccessTable
                      data={measuresData}
                      columns={measureColumns}
                    />
                  </div>
                  <div className="flex gap-2.5 mr-4">
                    <Button
                      variant="outline"
                      className="border-[#FF5855] text-[#FF5855]"
                    >
                      Reject
                    </Button>
                    <Button>Approve</Button>
                  </div>
                </div>
              </div>
              <Comment label="measure of success" />
            </section>

            {/* Strategic Intent */}
            <section>
              <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
                <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                  Strategic Intent
                </h2>
                <div className="mt-2">
                  <h3 className="text-lg font-medium">- Strategic Intent 1</h3>
                  <div className="flex justify-between items-end">
                    <div className="ml-4">
                      <p className="mt-2">
                        <span className="font-semibold">Intent:</span> Lorem
                        Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                      <p className="mt-1">
                        <span className="font-semibold">Behaviors:</span> simply
                        dummy text of the printing
                      </p>
                    </div>
                    <div className="flex gap-2.5 mr-4">
                      <Button
                        variant="outline"
                        className="border-[#FF5855] text-[#FF5855]"
                      >
                        Reject
                      </Button>
                      <Button>Approve</Button>
                    </div>
                  </div>
                </div>
              </div>
              <Comment label="strategic intent" />
            </section>

            {/* Specialized Tasks */}
            <SpecifiedTasks title="Specified Task 1" />

            {/* Specified Task 2 */}
            <SpecifiedTasks title="Specified Task 2" />

            {/* Implied Tasks 1 */}
            <ImpliedTask title="Implied Task 1" />

            {/* Implied Tasks 2 */}
            <ImpliedTask title="Implied Task 2" />

            {/* Freedom and Constraint */}
            <section>
              <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
                <div className=" flex justify-between items-end">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                        Freedom{" "}
                      </h2>
                      <div className="mt-2">
                        <h3 className="text-lg font-medium">
                          - Transportation to and from client location
                        </h3>
                        <h3 className="text-lg font-medium">
                          - Lack of experienced team members
                        </h3>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                        Constraints
                      </h2>
                      <div className="mt-2">
                        <h3 className="text-lg font-medium">
                          - Ability to innovate design process
                        </h3>
                        <h3 className="text-lg font-medium">
                          - Select skill to improve on
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-end">
                    <Button
                      variant="outline"
                      className="border-[#FF5855] text-[#FF5855]"
                    >
                      Reject
                    </Button>
                    <Button>Approve</Button>
                  </div>
                </div>
              </div>
              <Comment label="freedom & constraints" />
            </section>
          </div>
        </div>
      ) : (
        <div>
          <PresentationView />
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApproveMissionPlan;
