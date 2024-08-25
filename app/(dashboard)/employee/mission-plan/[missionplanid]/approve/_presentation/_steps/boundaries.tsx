import { BoundariesType } from "@/@types/missionPlan/MissionPlanAprovables";
import React from "react";

type Props = {
  data: BoundariesType[];
};

const Boundaries = ({ data }: Props) => {
  return (
    <div className="bg-white custom-shadow rounded-[0.5rem] w-full mx-auto text-left mb-10 pb-[1.375rem] pt-[2.375rem] pl-[7.625rem]">
      <h2 className="text-2xl font-medium">Boundaries</h2>
      <div className="flex gap-14 w-3/4 xl:w-1/2">
        <div className="basis-1/2">
          <h3 className="font-medium mt-4 mb-3">Freedoms</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside list-disc">
            {data[0]?.freedoms?.map((freedom) => (
              <li key={freedom}>{freedom}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium mt-4 mb-3">Constraints</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside list-disc">
            {data[0]?.constraints?.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Boundaries;
