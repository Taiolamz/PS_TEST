"use client";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import SpecifiedTasks from "../../_components/SpecifiedTasks";
import ImpliedTask from "../../_components/ImpliedTask";
import MeasureOfSuccessTable from "../../_components/measureOfSuccessTable";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import routesPath from "@/utils/routes";
import { presentationSteps } from "../_data";
import PresentationView from "./_presentation/presentation-view";

const ApproveMissionPlan = () => {
  const router = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  return (
    <DashboardLayout headerTitle="Approve Mission Plan">
      {!ui ? (
        <div className="py-14 px-[1.625rem] bg-white">
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
            <section className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Mission Statement
              </h2>
              <div className="flex justify-between items-end w-full">
                <p className="w-[52%]">
                  My MISSION PLAN Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Feugiat sit sed at neque. Semper suspendisse
                  diam habitant pulvinar arcu, mi.
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
            </section>

            {/* Measure of Success */}
            <section className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
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
            </section>

            {/* Comments */}
            <section className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] bg-[#F6F8F9]">
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex gap-3 items-center">
                  <h2 className="text-[var(--primary-color)] text-sm">
                    Comments
                  </h2>
                  <p className="inline-flex py-0.5 px-2 text-xs rounded-full text-[var(--primary-color)] bg-[#0080801A]">
                    2
                  </p>
                </div>
                <div className="flex gap-3.5 items-center">
                  <p className="flex gap-2.5 items-center text-[#6E7C87] text-sm">
                    <PlusIcon width={24} height={24} /> Add comment
                  </p>
                  <div className="flex items-center gap-2">
                    <MdChevronLeft
                      className="border-[0.0938rem] border-[#9AA6AC] text-[#9AA6AC] rounded-sm"
                      size={24}
                    />
                    <MdChevronRight
                      size={24}
                      className="border-[0.0938rem] border-[#9AA6AC] text-[#9AA6AC] rounded-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3.5 ">
                <div className="pt-3 pb-3.5 pr-8 pl-5 border-[#E5E9EB] border bg-white rounded-sm">
                  <div className="flex justify-between items-center mb-[0.4375rem]">
                    <div className="flex gap-1.5 items-center">
                      <h3 className="text-[0.625rem]  text-[#6E7C87]">
                        MISSION STATEMENT
                      </h3>
                      {/* Badge Here */}
                      <Badge className="text-[0.5rem] text-[#7E10E5] bg-[#7E10E51A]">
                        Bayo Taiwo
                      </Badge>
                    </div>
                    {/* Action Icon Button */}
                    <HiDotsHorizontal />
                  </div>
                  <p>
                    {`Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled.`}
                  </p>
                  <div className="flex gap-[0.4375rem] justify-end">
                    <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                      08/10/2024
                    </p>
                    <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                      11:30pm
                    </p>
                  </div>
                </div>
                <div className="pt-3 pb-3.5 pr-8 pl-5 border-[#E5E9EB] border bg-white rounded-sm">
                  <div className="flex justify-between items-center mb-[0.4375rem]">
                    <div className="flex gap-1.5 items-center">
                      <h3 className="text-[0.625rem]  text-[#6E7C87]">
                        MISSION STATEMENT
                      </h3>
                      {/* Badge Here */}
                      <Badge className="text-[0.5rem] text-[#7E10E5] bg-[#7E10E51A]">
                        Bayo Taiwo
                      </Badge>
                    </div>
                    {/* Action Icon Button */}
                    <HiDotsHorizontal />
                  </div>
                  <p>
                    {`Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled.`}
                  </p>
                  <div className="flex gap-[0.4375rem] justify-end">
                    <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                      08/10/2024
                    </p>
                    <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                      11:30pm
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Strategic Intent */}
            <section className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Strategic Intent
              </h2>
              <div className="mt-2">
                <h3 className="text-lg font-medium">- Strategic Intent 1</h3>
                <div className="flex justify-between items-end">
                  <div className="ml-4">
                    <p className="mt-2">
                      <span className="font-semibold">Intent:</span> Lorem Ipsum
                      is simply dummy text of the printing and typesetting
                      industry.
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
            <section className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem]">
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
