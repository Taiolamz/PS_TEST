import { StrategicIntentType } from "@/@types/missionPlan/MissionPlanAprovables";
import React from "react";

type Props = {
  data: StrategicIntentType[];
};

const StrategicIntent = ({ data }: Props) => {
  return (
    <div className="bg-white custom-shadow rounded-[0.5rem] w-full mx-auto text-center mb-10 pb-[4.25rem] pt-[2.625rem]">
      <section className="">
        {" "}
        <h2 className="text-primary font-medium text-2xl mb-[1.375rem]">
          Strategic Intent
        </h2>
        <div className="flex flex-col gap-5">
          {data?.map((item, index) => (
            <div key={item?.id}>
              <div className=" flex flex-col gap-3">
                <h3 className=" font-medium text-2xl text-[#1E1E1E]">
                  Intent {index + 1}
                </h3>
                <p className="w-3/5 mx-auto text-sm text-[#6E7C87]">
                  {item?.intent}
                </p>
              </div>
            </div>
          ))}
          <div className="text-left w-3/5 mx-auto mt-[3.625rem]">
            <h3 className=" font-medium text-2xl text-[#1E1E1E] mb-4">
              Behaviours
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside list-disc">
              {data?.map((item, index) => (
                <li key={item?.id}> {item?.behaviours}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrategicIntent;
