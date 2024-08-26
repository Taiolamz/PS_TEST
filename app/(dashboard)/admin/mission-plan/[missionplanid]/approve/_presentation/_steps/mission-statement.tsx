"use client";

import React, { useMemo } from "react";
import MeasureOfSuccessTable from "../../../../_components/measure-of-success-table";
import { measureOfSuccessPresentationViewColumns } from "@/utils/data/dashboard/missionplan/dummy";
import MissionPlanApprovablesType, {
  MeasureOfSuccessType,
} from "@/@types/missionPlan/MissionPlanAprovables";
import { Loader2 } from "lucide-react";

type Props = {
  data?: MissionPlanApprovablesType;
  isLoading: boolean;
};

const MissionStatement = ({ data, isLoading }: Props) => {
  const measureColumnData = useMemo(
    () => measureOfSuccessPresentationViewColumns(),
    []
  );
  const transformedMeasureOfSuccessRows = (
    mappedData: MeasureOfSuccessType[]
  ): MeasureOfSuccessType[] => {
    return mappedData?.map((item) => ({
      id: item.id,
      measure: item.measure,
      status: item.status,
      target: item.target,
      unit: item.unit,
      weight: item?.weight ? item?.weight + "%" : "N/A",
    }));
  };

  const measureOfSuccessData: MeasureOfSuccessType[] =
    transformedMeasureOfSuccessRows(data?.measure_of_success ?? []);
  return (
    <div className="">
      <section className="border w-full mx-auto text-center mb-10 pb-[1.375rem] pt-[2.625rem] rounded-[0.5rem]">
        {" "}
        <h2 className="text-primary font-medium text-2xl">Mission Statement</h2>
        <div className="mt-5 flex flex-col gap-3">
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin mr-1" />
            </div>
          ) : (
            <p className="w-3/5 mx-auto text-sm text-[#6E7C87]">
              {data?.mission_statement?.mission || "no mission statement found"}
            </p>
          )}
        </div>
      </section>
      <section className="border w-full mx-auto text-center mb-10 pb-[1.375rem] pt-[2.625rem]  rounded-[0.5rem]">
        {" "}
        <h2 className="text-primary font-medium text-2xl">
          Measure of Success
        </h2>
        <div className="w-[76%] mx-auto mt-9">
          <MeasureOfSuccessTable
            data={measureOfSuccessData}
            columns={measureColumnData}
            isPresentationView
          />
        </div>
      </section>
    </div>
  );
};

export default MissionStatement;
