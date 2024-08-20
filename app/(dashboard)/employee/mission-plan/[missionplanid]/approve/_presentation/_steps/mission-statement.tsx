import React, { useMemo } from "react";
import MeasureOfSuccessTable from "../../../../_components/measure-of-success-table";
import { measureColumns } from "@/utils/data/dashboard/missionplan/dummy";
import MissionPlanApprovablesType, {
  MeasureOfSuccessType,
} from "@/@types/missionPlan/MissionPlanAprovables";

type Props = {
  data?: MissionPlanApprovablesType;
};

const MissionStatement = ({ data }: Props) => {
  const measureColumnData = useMemo(() => measureColumns(), []);
  const transformedMeasureOfSuccessRows = (
    mappedData: MeasureOfSuccessType[]
  ): MeasureOfSuccessType[] => {
    return mappedData?.map((item) => ({
      id: item.id,
      measure: item.measure,
      status: item.status,
      target: item.target,
      unit: item.unit,
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
          <p className="w-3/5 mx-auto text-sm text-[#6E7C87]">
            {data?.mission_statement?.mission}
          </p>
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
        </div>{" "}
      </section>
    </div>
  );
};

export default MissionStatement;
