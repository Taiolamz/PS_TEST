import { BoundariesType } from "@/@types/missionPlan/MissionPlanAprovables";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { addAlphaToHex } from "@/utils/helpers/add-alpha-to-hex";
import { Dot, Loader2 } from "lucide-react";
import React from "react";

type Props = {
  data: BoundariesType[];
  isLoading: boolean;
};

const Boundaries = ({ data, isLoading }: Props) => {
  const { primaryColorHexValue } = React.useContext(ActionContext);
  const colorWithAlpha = primaryColorHexValue
    ? addAlphaToHex(primaryColorHexValue, 0.05)
    : "";
  return (
    <div className="border rounded-[0.5rem] w-full mx-auto text-left mb-10 pb-[1.375rem] pt-[2.375rem] pl-[7.625rem]">
      <h2 className="text-2xl font-medium">Boundaries</h2>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin mr-1" />
        </div>
      )}
      <div className="flex gap-14 w-3/4 xl:w-1/2">
        <div className="basis-1/2">
          <h3 className="font-medium mt-4 mb-3">Freedoms</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside">
            {data[0]?.constraints?.length ? (
              data[0]?.freedoms?.map((freedom) => (
                <li
                  key={freedom}
                  className="capitalize flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-[#015858]"></div>
                  {freedom}
                </li>
              ))
            ) : (
              <p>No freedom found.</p>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-medium mt-4 mb-3">Constraints</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside list-disc">
            {data[0]?.constraints?.length ? (
              data[0]?.constraints?.map((constraint) => (
                <li
                  key={constraint}
                  className="capitalize flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-[#015858]"></div>
                  {constraint}
                </li>
              ))
            ) : (
              <p>No constraint found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Boundaries;
