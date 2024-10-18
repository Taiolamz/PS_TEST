import React from "react";
import MeasureOfSucessProgress from "../_partials/_my_report/_fragment/measure-of-success-progress";
import SpecifiedTaskProgress from "../_partials/_my_report/_fragment/specified-task-progress";
import ReportFilter from "../_partials/_my_report/_fragment/report-filter";
import {
  useGetMissionPlanReportCycleQuery,
  useGetStaffPhotoFiscalYearQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useRouter } from "next/navigation";
import { returnInitial } from "@/utils/helpers";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import CheckUrlFragment from "@/components/fragment/ImageFallBack";

export default function ProgressReport({ id }: { id: string }) {
  const router = useRouter();
  const [fiscalYear, setFiscalYear] = React.useState("");
  const [missionCycle, setMissionCycle] = React.useState("");

  const { data: staffData, isLoading: loadingStaffPhoto } =
    useGetStaffPhotoFiscalYearQuery(id);
  const { data, isLoading, isFetching } = useGetMissionPlanReportCycleQuery();

  return (
    <div className="m-5">
      {/* ----- FILTER/SELECT WRAP START------- */}
      <ReportFilter />
      {/* ----- FILTER/SELECT WRAP END------- */}

      {loadingStaffPhoto ? (
        <>
          {/* ----- USER INFO------- */}
          <div className="mt-9 inline-flex items-center gap-x-4">
            <Skeleton className="size-[160px] rounded-full  bg-[var(--primary-accent-color)]" />

            <div className="space-y-0.5">
              <Skeleton className="w-[180px] h-4 rounded-sm bg-[var(--primary-accent-color)]" />
              <Skeleton className="w-[130px] h-4 rounded-sm bg-[var(--primary-accent-color)]" />
            </div>
          </div>

          {/* ----- SPECIFIED TASK/MEASURE OF SUCCESS------- */}
          <div className="grid lg:grid-cols-12 mt-10 gap-5">
            <div className="col-span-5">
              <Skeleton className="w-full h-[700px] rounded-sm bg-[var(--primary-accent-color)]" />
            </div>
            <div className="col-span-7">
              <Skeleton className="w-full h-[700px] rounded-sm bg-[var(--primary-accent-color)]" />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ----- USER INFO------- */}
          <div className="mt-9 inline-flex items-center gap-x-4">
            <CheckUrlFragment
              url={staffData?.data?.photo as any}
              height={160}
              width={160}
              imgClassName="rounded-full"
              className="size-[160px] rounded-full bg-[var(--primary-accent-color)] text-white place-content-center grid text-6xl"
            >
              <div className="size-[160px] rounded-full bg-[var(--primary-color)] text-white place-content-center grid text-6xl">
                {returnInitial(staffData?.data?.name)}
              </div>
            </CheckUrlFragment>
            <div className="space-y-0.5">
              <p className="">{staffData?.data?.name}</p>
              <p className="text-[var(--text-color2)] text-sm">
                {staffData?.data?.email}
              </p>
            </div>
          </div>

          {/* ----- SPECIFIED TASK/MEASURE OF SUCCESS------- */}
          <div className="grid lg:grid-cols-12 mt-10 gap-5">
            {/* <MOSCard id={params.reportId} />
      <SpecifiedTaskCard id={params.reportId} /> */}
            <div className="col-span-5">
              <MeasureOfSucessProgress id={id} />
            </div>
            <div className="col-span-7">
              <SpecifiedTaskProgress id={id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
