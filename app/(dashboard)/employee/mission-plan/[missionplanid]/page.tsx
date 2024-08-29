"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import AllEmployeeTab from "./all-employee-tab";
// // import { PAGE_TABS } from "../_data";
// import CustomTab from "@/components/custom-tab";
// import { useAppSelector } from "@/redux/store";

export default function MissionPlanId() {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const data = useAppSelector((state) => state?.auth?.user);
  // const ui = searchParams.get("ui");
  return (
    <DashboardLayout>
      <div className="space-y-5 mt-8 mb-6 p-5 text-[var(--text-color3)]">
        {/* Financial Year */}
        <div className="border rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
          <h3 className="text-sm font-normal ">1. Financial Year</h3>
          <div className="grid grid-cols-10 gap-5 mt-4 max-w-4xl">
            {/* Title */}
            <div className="col-span-4 space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Title
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                ----------------------
              </p>
            </div>
            {/* Start Period */}
            <div className="col-span-3 space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Start Period
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                --------
              </p>
            </div>
            {/* End Period */}
            <div className="col-span-3 space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                End Period
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                --------
              </p>
            </div>
          </div>
        </div>
        <div className="border rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
          <h3 className="text-sm font-normal ">2. Mission and Vision</h3>
          <div className="space-y-7 mt-4 max-w-4xl">
            {/* Mission */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Mission
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                ------------------------------------------------------------------------------------------------------------
              </p>
            </div>
            {/* Vision */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Vision
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                --------------------------------------------------------------------------------------------------------------
              </p>
            </div>
          </div>
        </div>
        <div className="border rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
          <h3 className="text-sm font-normal ">3. Strategic Pillars</h3>
          <div className="space-y-7 mt-4 max-w-lg">
            {/* Pillar 1 */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Pillar 1
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                --------
              </p>
            </div>
            {/* Pillar 2 */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Pillar 2
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                --------
              </p>
            </div>
            {/* Pillar 3 */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Pillar 3
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                --------
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
